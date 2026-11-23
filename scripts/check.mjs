import assert from 'node:assert/strict';
import { readFile, readdir, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = p => readFile(path.join(root, p), 'utf8');
const json = async p => JSON.parse(await read(p));
const endpoint = 'https://musvideo.ai/api/mcp';
const plugin = await json('plugin.json');
const claude = await json('.claude-plugin/plugin.json');
const marketplace = await json('.claude-plugin/marketplace.json');
assert.equal(plugin.name, 'musvideo');
assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
assert.equal(plugin.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
assert.equal(plugin.author.name, 'MusVideo');
assert.equal(claude.name, plugin.name);
assert.equal(claude.version, plugin.version);
assert.equal(marketplace.plugins[0].version, plugin.version);
assert.equal(marketplace.plugins[0].source, './');
assert.ok(plugin.extensions['com.openai'].interface.shortDescription.length <= 30);
for (const [file, type] of [['mcp.json', 'streamable-http'], ['.mcp.json', 'http'], ['integrations/copilot/mcp-config.json', 'http']]) {
  const config = await json(file);
  assert.equal(config.mcpServers.musvideo.url, endpoint);
  assert.equal(config.mcpServers.musvideo.type, type);
  assert.ok(!config.mcpServers.musvideo.headers, 'Never distribute bearer credentials');
}
assert.equal((await json('integrations/cursor/mcp.json')).mcpServers.musvideo.url, endpoint);
assert.ok((await read('integrations/codex/config.toml')).includes(`url = "${endpoint}"`));
const registry = await json('mcp/server.json');
assert.equal(registry.version, plugin.version);
assert.equal(registry.remotes[0].url, endpoint);
assert.equal(registry.name, 'io.github.tjsdyy/musvideo');

const skill = await read('skills/musvideo/SKILL.md');
assert.match(skill, /^---\nname: musvideo\ndescription: .+\n---\n/);
assert.ok(Buffer.byteLength(skill) < 1024 * 1024);
assert.ok((await read('skills/musvideo/agents/openai.yaml')).includes(`url: "${endpoint}"`));
const snapshot = await json('mcp/tools.json');
const expected = ['get_account', 'get_credit_balance', 'import_song', 'create_mv_project', 'get_mv_progress', 'approve_story', 'quote_mv_render', 'start_mv_render', 'cancel_mv_render', 'list_my_videos', 'get_video'];
assert.deepEqual(snapshot.tools.map(t => t.name).sort(), expected.sort());
for (const t of snapshot.tools) {
  assert.equal(t.inputSchema.type, 'object');
  assert.equal(t.inputSchema.additionalProperties, false);
  assert.ok(t.description && t.outputSchema);
}

async function inspect(dir) {
  for (const entry of await readdir(path.join(root, dir), { withFileTypes: true })) {
    if (['.git', 'dist', 'node_modules'].includes(entry.name)) continue;
    const rel = path.join(dir, entry.name);
    assert.ok(!(await lstat(path.join(root, rel))).isSymbolicLink(), `Symlink: ${rel}`);
    assert.ok(!/^\.env(?:\.|$)|credentials|session\.json$/i.test(entry.name), `Private filename: ${rel}`);
    if (entry.isDirectory()) { await inspect(rel); continue; }
    const body = await read(rel);
    if (rel.endsWith('.json')) JSON.parse(body);
    assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:ghp|github_pat|sk_live)_[A-Za-z0-9_]{20,}|\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./.test(body), `Credential-like content: ${rel}`);
    assert.ok(!/\/Users\/[a-zA-Z0-9_-]+\//.test(body), `Local filesystem path: ${rel}`);
    if (rel.endsWith('.md')) {
      for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (/^(?:https?:|#)/.test(m[1])) continue;
        const target = path.resolve(root, path.dirname(rel), m[1].split('#')[0]);
        assert.ok(target.startsWith(root), `Escaping link: ${rel}`);
        await lstat(target);
      }
    }
  }
}
await inspect('');
console.log('PASS: Skill, 11 tools, manifests, client configs, local links and public-content checks.');

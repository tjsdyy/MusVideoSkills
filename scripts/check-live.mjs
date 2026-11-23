import assert from 'node:assert/strict';
import { writeFile, readFile } from 'node:fs/promises';

const origin = 'https://musvideo.ai';
const endpoint = origin + '/api/mcp';
async function rpc(method, params) {
  const response = await fetch(endpoint, {
    method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }), signal: AbortSignal.timeout(30000),
  });
  const data = await response.json();
  return { response, data };
}
const discovery = await fetch(origin + '/.well-known/oauth-authorization-server', { signal: AbortSignal.timeout(30000) });
assert.equal(discovery.status, 200);
const metadata = await discovery.json();
assert.equal(metadata.issuer, origin);
assert.equal(metadata.registration_endpoint, origin + '/api/oauth/register');
assert.ok(metadata.code_challenge_methods_supported.includes('S256'));
const init = await rpc('initialize', { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'musvideo-public-check', version: '0.1.0' } });
assert.equal(init.response.status, 200);
assert.equal(init.data.result.serverInfo.name, 'musvideo');
const listed = await rpc('tools/list', {});
assert.equal(listed.response.status, 200);
assert.equal(listed.data.result.tools.length, 11);
const snapshot = { tools: listed.data.result.tools };
if (process.argv.includes('--write-snapshot')) {
  await writeFile(new URL('../mcp/tools.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n');
} else {
  assert.deepEqual(snapshot, JSON.parse(await readFile(new URL('../mcp/tools.json', import.meta.url), 'utf8')), 'Live tool contract changed; review and refresh snapshot');
}
const denied = await rpc('tools/call', { name: 'get_credit_balance', arguments: {} });
assert.equal(denied.response.status, 401);
assert.ok(denied.response.headers.get('www-authenticate')?.includes('resource_metadata='));
assert.equal(denied.data.result.isError, true);
console.log(JSON.stringify({ publicDiscovery: true, tools: 11, pkce: 'S256', unauthenticatedCall: 401, paidCalls: 0 }));

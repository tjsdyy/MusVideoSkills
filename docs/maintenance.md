# Maintenance

The private MusVideo web repository owns the production authentication server, eleven MCP tool implementations, billing, rendering and background workers. This repository owns public integration instructions/configuration. Change business logic in the service first; keep these instructions aligned with its actual contract. Never export private Git history, environment files, credentials, review accounts, customer data or internal Director Skills.

`mcp/source.json` records the source revision and endpoint. `mcp/tools.json` is a public `tools/list` snapshot, not an implementation or authentication credential. Refresh only through `node scripts/check-live.mjs --write-snapshot`, review its diff, then validate. Do not hand-maintain a second tool schema.

Run `node scripts/check.mjs`, the standalone Skill validator if available, and `claude plugin validate .` when Claude Code is installed. `python3 scripts/package.py` packages allowlisted files only, excluding marketplace metadata from the portable plugin ZIP. Inspect archive contents before release. The CI workflow checks metadata and builds the archives; live endpoint checks are a separate command to avoid flaky CI dependencies.

When changing workflow instructions, check examples of: unrelated request, not connected, no-cost lookup, cost approval absent, story approval absent, stale quote, timeout/retry, insufficient credits, cancellation, and completed-video text fallback. Do not run paid renders just to validate packaging.

Sources checked on 2026-11-23:

- [Agent Skills](https://agentskills.io/home)
- [Skills CLI](https://github.com/vercel-labs/skills) and [directory FAQ](https://skills.sh/docs/faq)
- [Claude Code MCP](https://code.claude.com/docs/en/mcp) and [plugin manifests](https://code.claude.com/docs/en/plugins-reference)
- [Claude custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp)
- [Cursor MCP](https://cursor.com/docs/mcp)
- [VS Code/Copilot configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)
- [MCP authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Remote-server registry publication](https://modelcontextprotocol.io/registry/remote-servers)

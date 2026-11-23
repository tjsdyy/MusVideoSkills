# Client configuration

Merge the MusVideo entry into existing settings; do not overwrite other servers.

| Client | File / action | Authentication |
| --- | --- | --- |
| Codex | Merge `codex/config.toml` into `~/.codex/config.toml`, or use the README CLI commands | `codex mcp login musvideo` |
| Claude Code | Root `.mcp.json` uses `type: http`; or use standalone CLI / plugin installation | `/mcp` → MusVideo → Authenticate |
| Claude web/Desktop/Cowork | Settings → Connectors → add `https://musvideo.ai/api/mcp`; Register automatically | Browser OAuth consent |
| Cursor | Merge `cursor/mcp.json` into `.cursor/mcp.json` or global settings | Client's OAuth Connect control |
| VS Code/Copilot | Merge `copilot/mcp-config.json` into `~/.copilot/mcp-config.json`, or use workspace `.mcp.json` / guided setup | Client's sign-in flow; not end-to-end verified |

Portable `mcp.json` uses `streamable-http`; Claude/Copilot `.mcp.json` uses `http`. These are different consumer schemas for the same endpoint, not different backend services.

VS Code's older `.vscode/mcp.json` uses a different `servers` format. The current Copilot documentation recommends its native configuration above. Other agent harnesses inside VS Code can have their own settings. See the [official configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

OAuth access is scoped per user. No client secret is distributed. Exact supported hosted redirects are Claude's `https://claude.ai/api/mcp/auth_callback`, Cursor's `https://www.cursor.com/agents/mcp/oauth/callback` and the existing ChatGPT callbacks. Native clients use literal loopback `/callback` URLs; registration, PKCE and code-exchange binding remain enforced. Unsupported redirects require an explicit service update, not disabling validation.

If a client's published metadata cannot be retrieved, use its DCR / Register automatically option where available. Do not invent a client ID or use someone else's token. If only a config was checked, do not report full client support: see [verification](../docs/verification.md).

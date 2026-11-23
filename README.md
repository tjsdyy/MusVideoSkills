# MusVideo Skills + MCP

Turn a song into a music video from your AI assistant: sign in, agree the story, confirm credits, render, then check progress and watch the result.

[中文说明](README.zh-CN.md) · [Download ZIPs](https://github.com/tjsdyy/MusVideoSkills/releases/tag/v0.1.0) · [MusVideo](https://musvideo.ai) · [Connection guide](skills/musvideo/references/connection.md) · [Verification status](docs/verification.md)

## Install the Skill

With Node.js 22.20 or later:

```sh
npx skills add tjsdyy/MusVideoSkills --skill musvideo
```

Choose your assistant in the installer. This installs the workflow instructions. **Connect the MCP server and sign in separately** using the guide below. No API key or shared account is included.

## Connect the service

Endpoint: **`https://musvideo.ai/api/mcp`** · Streamable HTTP · OAuth + PKCE.

For Codex:

```sh
codex mcp add musvideo --url https://musvideo.ai/api/mcp
codex mcp login musvideo
```

For Claude Code:

```sh
claude mcp add --transport http musvideo https://musvideo.ai/api/mcp
claude mcp login musvideo
```

Alternatively install the complete Claude Code plugin (Skill + connection):

```sh
claude plugin marketplace add tjsdyy/MusVideoSkills
claude plugin install musvideo@musvideo
```

Then use `/mcp` to authenticate the plugin's MusVideo server. Choose either the plugin or standalone MCP setup to avoid duplicate tools. For a local checkout, `claude --plugin-dir .` loads the plugin for that session.

For **Claude web/Desktop/Cowork**, add a custom connector with the endpoint and choose **Register automatically**. For **Cursor** and **VS Code/Copilot**, use [client configurations](integrations/README.md). A configuration file alone does not establish or certify a connection.

Start with: “Use MusVideo to check my credit balance and list my videos.” When connected, try: “Make a vertical, dreamy city music video for this song: [my audio URL].” The assistant will ask before spending credits.

## What is included

- `skills/musvideo/`: portable workflow, recovery instructions and MCP dependency metadata.
- `mcp.json` + `plugin.json`: portable Agent Plugins package.
- `.claude-plugin/` + `.mcp.json`: Claude Code plugin and marketplace compatibility.
- `integrations/`: client-specific configuration examples.
- `mcp/`: public tool schema snapshot and MCP Registry manifest.
- `scripts/`: validation, public endpoint checks and reproducible ZIP packaging.

The hosted MCP uses the same authentication, account, billing, story approval, render confirmation, idempotent retry and background processing as the MusVideo ChatGPT integration. This repository does not duplicate the production backend, mobile app, Director, deployment secrets or private source history. It is a public distribution layer, not a self-hostable renderer.

## Credits, privacy and limitations

A MusVideo account and sufficient existing credits are required. Import is free; starting analysis/story currently costs 6 credits after confirmation. The full render has a separate quote that must be approved. Credits cannot be purchased or plans changed through this integration.

Use audio you have the right to use. Public audio/Suno links work across clients. ChatGPT attachment import depends on that host's file integration; do not assume another client's local attachment is uploadable. Cards depend on MCP Apps support; text and watch links provide the fallback.

[Privacy](https://musvideo.ai/privacy) · [Terms](https://musvideo.ai/terms) · [Support](https://musvideo.ai/support)

The existing ChatGPT directory submission is separate and remains subject to OpenAI review. Installing this repository is not a directory approval by OpenAI, Anthropic, Cursor or Microsoft. See [distribution status](docs/distribution.md).

## Maintain and package

```sh
node scripts/check.mjs
node scripts/check-live.mjs
python3 scripts/package.py
```

ZIPs are written to `dist/`; the standalone Skill ZIP has `musvideo/SKILL.md` at its root folder, and the portable plugin ZIP contains one complete plugin. No credentials are needed for validation or public discovery checks. See [maintenance](docs/maintenance.md) for source provenance and updating schemas.

Integration files in this repository are MIT licensed. The hosted MusVideo service and production implementation are governed separately by the service terms.

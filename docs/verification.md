# Verification record

Baseline release 0.1.0; 2026-11-23. These results distinguish actual authentication from configuration examples and full video-generation tests.

| Check | Result |
| --- | --- |
| Skill format | Passed standalone Skill validator |
| Skills CLI installation | Installed exactly one `musvideo` Skill from GitHub into an isolated project; all files match source |
| Claude Code plugin installation | Marketplace cloned from GitHub; plugin 0.1.0 installed and enabled in isolated local scope |
| Plugin/config/link validation | Passed native Claude manifest validators and repository validation; 11 tools match the live public contract |
| ZIP archives | Allowlisted contents, CRC and deterministic SHA-256 verified |
| Production service regression | 52 tests, 368 assertions passed; type checking and production build passed |
| Deployed service | Production revision `712959ec495d71165fe8bcf0cb362cf40cc73fd0`; new HTTP auth challenges and client callbacks verified live |
| Protocol-level OAuth | Claude hosted callback, Cursor hosted callback, localhost native callback and 127.0.0.1 native callback passed DCR, PKCE, token exchange, read-only tools, refresh and revocation |
| Codex native OAuth | CLI 0.171.0-alpha.13 successfully authenticated using its published identity; its token read credits and videos |
| Claude Code native OAuth | CLI 2.1.238 successfully authenticated using its published identity and reported its tools available |
| MCP Registry | Version 0.1.0 published and read back as active; [receipt](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.tjsdyy%2Fmusvideo/versions/0.1.0) |
| Cursor and VS Code application UI | Not tested; client configuration supplied, without UI certification |
| Third-party paid MV creation | Not repeated in this release |

Native OAuth tests used the clients' headless callback flow against production with a dedicated test account. Protocol checks read the credit balance, project list, completed project progress and video result; they did not create or render new videos. No MusVideo credits were spent. Credentials and full authorization callbacks are not included in this repository.

The original ChatGPT integration has completed real MV generation and playback. It shares the same eleven server tools, billing and background renderer; that evidence is not a separate third-party client's end-to-end generation test. MCP Apps playback and local file attachments remain host-dependent.

The first Claude test harness incorrectly concatenated the hidden and visible parts of an OSC8 terminal hyperlink. Correct extraction and an interactive terminal resolved the test issue. No extra production workaround, shared token or static native client ID was needed. The public setup commands use the clients' normal OAuth paths.

## Integration patch 0.1.1

The skill now explicitly checks authorization to send the selected audio source to MusVideo before `import_song`. A user request naming MusVideo and that source already grants this authorization; attaching a file or approving a later credit charge alone does not. The standalone skill also includes the MIT license file.

This instruction/package-only patch addresses the medium-severity sharing-consent wording finding in [Skillstore's initial review PR](https://github.com/aiskillstore/marketplace/pull/4332), which scanned source release 0.1.0 and allowed publication subject to review. That original audit is not represented as a re-audit of 0.1.1. Manifests, local links, public-content checks and ZIP integrity were checked for the patch; no service code or authentication behavior changed, and no new paid render was run.

# Verification record

Release 0.1.0; 2026-11-23. This record distinguishes tested behavior from configuration examples.

| Check | Result |
| --- | --- |
| Skill format | Passed standalone Skill validator |
| Skills CLI discovery | Found exactly one `musvideo` Skill |
| Claude plugin + marketplace manifests | Passed native CLI validation |
| Package/config/link checks | Passed; eleven tool schemas captured from public endpoint |
| ZIP archives | Allowlisted contents, CRC and deterministic SHA-256 verified |
| Service regression | 52 tests, 368 assertions passed, including original ChatGPT flow |
| Service types and production build | Passed |
| Production deployment / multi-client OAuth | Validation in progress; not yet certified |
| Cursor and VS Code UI | Not tested; configuration examples only |
| Third-party paid creation | Not repeated in this release |

The original ChatGPT integration has completed real video generation and playback. That evidence is not a new client's end-to-end test. Live authorization, refresh, revocation and native CLI results will be recorded when verified; a schema check alone does not prove them.

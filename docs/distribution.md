# Distribution status

- GitHub: this repository is the canonical public distribution source.
- skills.sh: installable from GitHub with the Skills CLI. Directory visibility and ranking depend on its indexing and actual installation telemetry; no vendor-example-repository PR is required. No rank or inclusion is promised.
- Claude Code: this repository supplies its own plugin marketplace manifest. This is not Anthropic's official marketplace approval.
- MCP Registry: **published, active** as `io.github.tjsdyy/musvideo` version `0.1.1` on 2026-11-23. [Registry record](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.tjsdyy%2Fmusvideo/versions/0.1.1) · [successful publication workflow](https://github.com/tjsdyy/MusVideoSkills/actions/runs/45203665217). Published using GitHub OIDC; no stored registry secret is required.
- OpenAI: the existing MusVideo ChatGPT public submission is under review as of 2026-11-23. This repository and ZIP do not replace or modify that submitted release.
- Other directories: no Glama, Cursor, Microsoft or Claude public-directory acceptance is claimed without a receipt. Smithery's former proxy/identity service is not a dependency.

## Third-party Skills directories

Checked and submitted on **2026-11-23**. A successful submission is not a published listing or an endorsement by the directory.

| Directory | Submission route | Verified status | Receipt |
| --- | --- | --- | --- |
| MCP.Directory | Public Skill URL, category Design | Submitted; confirmation: “Skill Submitted!”; awaiting review | [Submission page](https://mcp.directory/submit-skill) (no individual tracking URL supplied) |
| Skillstore | Public skill folder URL | Processing completed; review PR open; initial audit allowed publication with a medium finding (addressed in source patch 0.1.1, awaiting review) | [Review PR #4332](https://github.com/aiskillstore/marketplace/pull/4332) · [Submission status](https://skillstore.io/zh-hans/submissions/4e2ac7e6-3e74-40dd-b64f-8f2fc92ba377) · [Processing workflow](https://github.com/aiskillstore/marketplace/actions/runs/45201663391) |
| theskills.directory | Skill folder and references submitted by PR | PR open, awaiting maintainer review; not merged | [PR #20](https://github.com/theskillsdirectory/skills/pull/20) |
| Open Skill Market (skillmarket.cc) | Canonical repository added to priority crawler list by PR | PR open, awaiting maintainer review; not merged | [PR #19](https://github.com/coolzwc/open-skill-market/pull/19) |

All four submissions use the MusVideo name and public integration files. They disclose browser OAuth, the user's own account, MCP connection requirements, and credit charges for hosted generation. No reviewer credentials, production configuration, payment, or paid promotion were used.

The Open Skill Market submission points to this repository so future updates can be indexed from the canonical source. The theskills.directory submission includes a copy of the skill and all referenced files, with the original MIT license and catalog-specific metadata. Its metadata revision 1.0.1 adapts source release v0.1.1; future substantive changes should also be submitted to that catalog copy.

Official submission rules: [MCP.Directory](https://mcp.directory/submit-skill), [Skillstore](https://skillstore.io/submit), [theskills.directory contribution guide](https://github.com/theskillsdirectory/skills/blob/main/CONTRIBUTING.md), [Open Skill Market publishing options](https://github.com/coolzwc/open-skill-market#publishing-your-skill).

Skillstore follow-up: the source patch and request to refresh/re-audit the candidate are recorded in [the existing review PR](https://github.com/aiskillstore/marketplace/pull/4332#issuecomment-7105338567). No duplicate submission was created; the initial audit scanned 0.1.0 and the updated candidate is still subject to maintainer review.

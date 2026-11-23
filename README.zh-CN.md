# MusVideo Skills + MCP

在支持 Skills 和 MCP 的 AI 助手里完成：登录 MusVideo → 导入歌曲 → 确认故事 → 确认渲染积分 → 生成 MV → 查看进度和成片。

[下载 Skill / 插件 ZIP](https://github.com/tjsdyy/MusVideoSkills/releases/tag/v0.1.1) · [MCP Registry 已收录](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.tjsdyy%2Fmusvideo/versions/0.1.0)

## 安装

需要 Node.js 22.20 或更新版本：

```sh
npx skills add tjsdyy/MusVideoSkills --skill musvideo
```

安装时选择所用客户端。**Skill 负责指导操作，MCP 负责调用服务；安装 Skill 后还需配置 MCP、登录自己的 MusVideo 账号。**

统一服务地址：`https://musvideo.ai/api/mcp`，使用 Streamable HTTP 和 OAuth/PKCE，不需要复制 API Key。

Codex：

```sh
codex mcp add musvideo --url https://musvideo.ai/api/mcp
codex mcp login musvideo
```

Claude Code：

```sh
claude mcp add --transport http musvideo https://musvideo.ai/api/mcp
claude mcp login musvideo
```

也可安装包含 Skill 和 MCP 的 Claude Code 插件：

```sh
claude plugin marketplace add tjsdyy/MusVideoSkills
claude plugin install musvideo@musvideo
```

然后在 `/mcp` 中连接插件提供的 MusVideo。不要同时重复添加同一个服务。

Claude 网页版/Desktop/Cowork 在设置的 Connectors 中添加上述地址，选择 Register automatically。Cursor、VS Code/Copilot 配置见 [接入示例](integrations/README.md)。[验证记录](docs/verification.md) 区分真实登录与仅配置检查。

## 使用

先说：“用 MusVideo 查一下我的积分和视频。”再说：“把这首歌做成竖屏、梦幻城市风格的 MV：[歌曲链接]。”

导入免费；歌曲分析和故事目前为 6 积分，生成前需确认。完整渲染另行报价并再次确认。故事与分镜由同一套 MusVideo 后台生成，已启动的渲染在关闭对话后继续运行。之后用项目编号或标题查询，不必重新创建。

本仓库包含公开 Skill、客户端配置、插件包和工具接口清单。核心服务、App、Director、部署配置仍由原主仓库统一维护，避免出现第二套计费和认证实现。

目前跨客户端优先使用公开音频链接或 Suno 链接。ChatGPT 的附件能力不能直接等同于其他客户端的本地附件。可交互卡片取决于客户端支持；不支持时使用文本进度和播放链接。

仓库公开、插件可安装，不等于已被各平台官方商店收录。现有 ChatGPT 上架申请单独审核，详见 [分发状态](docs/distribution.md)。

公开接入文件采用 MIT；MusVideo 托管服务依照网站[条款](https://musvideo.ai/terms)及[隐私政策](https://musvideo.ai/privacy)提供。

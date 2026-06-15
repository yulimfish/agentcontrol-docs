# AgentControl

让 AI 助手控制你的 Minecraft Java 客户端。

AgentControl 是一个本地 Fabric + MCP 桥接项目，不需要服务端插件，也不需要额外的机器人账号。

## 仓库

| 仓库 | 说明 |
|------|------|
| [AgentControl](https://github.com/yulimfish/agentcontrol) | 总仓 |
| [AgentControl-Fabric](https://github.com/yulimfish/agentcontrol-fabric) | Fabric 客户端模组 |
| [AgentControl-MCP](https://github.com/yulimfish/agentcontrol-mcp) | MCP 服务 |
| [AgentControl-Docs](https://github.com/yulimfish/agentcontrol-docs) | 本文档站 |

## 快速开始

只需要两步：

1. **安装模组** → [下载 Fabric 模组](https://github.com/yulimfish/agentcontrol-fabric/releases) 放入 `mods` 文件夹
2. **配置 MCP** → 对 AI 助手说："帮我安装 AgentControl MCP"

[查看完整指南 →](/guide/quickstart)

## 架构

```text
AI 助手 / MCP 客户端
  -> AgentControl MCP
  -> http://127.0.0.1:17777
  -> AgentControl Fabric
  -> Minecraft 客户端 API
```

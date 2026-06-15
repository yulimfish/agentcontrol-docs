# AgentControl Docs

AgentControl Docs 包含 AgentControl 项目的跨仓库文档。

## GitHub 仓库

| 仓库 | 地址 |
|------|------|
| 本项目（Docs） | https://github.com/yulimfish/agentcontrol-docs |
| 总仓 | https://github.com/yulimfish/agentcontrol |
| Fabric 模组 | https://github.com/yulimfish/agentcontrol-fabric |
| MCP 服务 | https://github.com/yulimfish/agentcontrol-mcp |

## 与其他仓库的关系

- `AgentControl`：包含 Fabric、MCP 和 Docs 的总仓。
- `AgentControl-Fabric`：Minecraft 客户端模组，暴露本地状态和动作端点。
- `AgentControl-MCP`：MCP 服务，暴露 AI 工具并调用 Fabric 端点。
- `AgentControl-Docs`：本文档项目。

## 架构

```text
AI 助手 / MCP 客户端
  -> AgentControl MCP
  -> http://127.0.0.1:17777
  -> AgentControl Fabric
  -> Minecraft 客户端 API
```

AgentControl 是本地客户端控制方案。它不安装服务端插件，不使用命令方块，不使用 RCON，也不以额外机器人账号加入服务器。

## 已完成工作总结

Fabric 侧：

- 本地 `/state` 端点。
- 本地 `/action` 端点。
- 状态读取：玩家状态、坐标、朝向、血量、饥饿值、物品栏摘要、准星目标、附近方块和附近实体。
- 动作执行：移动、视角、攻击、使用、方块破坏/放置、关闭界面、释放鼠标。
- Mod Menu 集成，包含英文和简体中文本地化。

MCP 侧：

- 基于 Fabric 的状态和动作工具。
- 旧 macOS System Events 工具默认关闭。
- 可配置 Fabric 端点 URL。

仓库整理：

- 项目统一命名为 AgentControl。
- 添加 MIT 许可证。
- 根仓和每个子仓都已准备 `README.md`、`.gitignore` 和 `AGENTS.md`。

## 安全边界

AgentControl 只控制用户的本地客户端。远程服务器仍然拥有最终判定权。AgentControl 不绕过权限、区域保护、反作弊、冷却时间或游戏规则。

## 后续建议补充的文档

- 带截图的安装步骤。
- MCP 客户端配置示例。
- Mod Menu 设置截图。
- 工具调用示例。
- 版本兼容矩阵。

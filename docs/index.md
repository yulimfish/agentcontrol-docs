---
layout: home

hero:
  name: AgentControl
  text: 让 AI 控制你的 Minecraft 客户端
  tagline: 本地 Fabric 模组 + MCP 服务桥接，无需服务端插件，无需机器人账号
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/yulimfish/agentcontrol
    - theme: alt
      text: Releases
      link: https://github.com/yulimfish/agentcontrol-fabric/releases

features:
  - icon: 🎮
    title: Fabric 客户端模组
    details: 在本地 Minecraft 客户端运行，暴露状态读取和动作执行 HTTP 端点。支持 1.21.1，零服务端依赖。读取坐标、血量、物品栏、环境、准星目标等完整状态。
  - icon: 🤖
    title: MCP 服务集成
    details: 一句话让 AI 助手安装配置。提供 mod_move_player、mod_look、mod_attack、mod_select_slot、mod_drop 等工具，直接调用本地模组，无需系统键盘模拟。
  - icon: 🔒
    title: 安全边界清晰
    details: 只控制你自己的本地客户端。不绕过服务器权限、反作弊或区域保护。服务器收到的是正常客户端操作包。
  - icon: ⚡
    title: 两分钟搞定
    details: 从 GitHub Releases 下载模组放入 mods 文件夹，对 AI 助手说"帮我安装 AgentControl MCP"，即可开始使用。
  - icon: 🧠
    title: 世界记忆缓存
    details: 自动缓存已探索区域的方块数据，按维度隔离存储。退出后重进可恢复对世界的认知。状态端点支持 scanRadius 参数调整扫描范围。
  - icon: 📖
    title: 完整 API 文档
    details: 提供详细的 API 参考文档，包含状态端点所有字段说明、动作端点参数表、12 种工具使用示例。帮助 AI 精确理解你的 Minecraft 状态。
  - icon: 🌐
    title: 开源 & 可扩展
    details: 基于 MIT 许可发布。代码清晰模块化，支持 12 种动作类型和完整状态读取。欢迎提交 PR 和 Issue。
---

## 架构概览

```text
AI 助手 / MCP 客户端
    ↓
  AgentControl MCP
    ↓
  http://127.0.0.1:17777
    ↓
  AgentControl Fabric
    ↓
  Minecraft 客户端 API
    ↓
  远程服务器 (正常网络包)
```

## 相关仓库

| 仓库 | 说明 | 地址 |
|------|------|------|
| **AgentControl** | 总仓 | [GitHub](https://github.com/yulimfish/agentcontrol) |
| **AgentControl-Fabric** | Fabric 客户端模组 | [GitHub](https://github.com/yulimfish/agentcontrol-fabric) · [Releases](https://github.com/yulimfish/agentcontrol-fabric/releases) |
| **AgentControl-MCP** | MCP 服务 | [GitHub](https://github.com/yulimfish/agentcontrol-mcp) |
| **AgentControl-Docs** | 本文档站 | [GitHub](https://github.com/yulimfish/agentcontrol-docs) |

## 快速开始

只需要两步：

1. **安装模组** → [下载 Fabric 模组](https://github.com/yulimfish/agentcontrol-fabric/releases) 放入 `mods` 文件夹
2. **配置 MCP** → 对 AI 助手说："帮我安装 AgentControl MCP"

[查看完整指南 →](/guide/quickstart)

<style scoped>
.VPButton {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}
</style>

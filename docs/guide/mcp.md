# 配置 MCP 服务

## 一句话安装（推荐）

对 AI 助手说：

```text
帮我安装 AgentControl MCP
```

AI 会自动完成配置并重启 OpenCode。重启后以下工具将可用：

| 工具 | 说明 |
|------|------|
| `get_client_state` | 读取 Minecraft 客户端状态（支持 `scan_radius` 参数） |
| `mod_move_player` | 移动玩家（WASD / 跳跃 / 潜行 / 疾跑） |
| `mod_look` | 调整视角 |
| `mod_attack` | 攻击 |
| `mod_use_item` | 使用物品 |
| `mod_break_crosshair_block` | 破坏准星方块 |
| `mod_place_crosshair_block` | 放置/使用方块 |
| `mod_select_slot` | 切换快捷栏槽位（0-8） |
| `mod_drop` | 丢弃手持物品 |
| `mod_swap_hands` | 主副手交换 |
| `mod_close_screen` | 关闭界面 |
| `mod_release_mouse` | 释放鼠标 |

## 手动配置

编辑 OpenCode 配置文件 `~/.config/opencode/opencode.jsonc`：

```jsonc
{
  "mcp": {
    "agentcontrol": {
      "type": "local",
      "command": ["node", "/path/to/agentcontrol-mcp/src/server.js"],
      "enabled": true
    }
  }
}
```

::: warning 重要
修改后必须**退出并重启 OpenCode**，配置不会热加载。
:::

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `MINECRAFT_MCP_CLIENT_STATE_URL` | `http://127.0.0.1:17777/state` | 状态端点 |
| `MINECRAFT_MCP_CLIENT_ACTION_URL` | `http://127.0.0.1:17777/action` | 动作端点 |

只有当 Fabric 模组使用了非默认端口时才需要修改。

## 启用旧版系统输入（不推荐）

默认情况下，旧的 macOS 系统键盘/鼠标自动化工具不会注册。如需临时启用：

```sh
MINECRAFT_MCP_ENABLE_SYSTEM_INPUT=1 node src/server.js
```

这会把 `focus_minecraft`、`press_key`、`move_player` 等旧工具重新暴露出来。但推荐优先使用 Fabric 模组控制。

## 安装依赖

```sh
cd agentcontrol-mcp
npm install
```

验证：

```sh
node --check src/server.js
```

## 安全说明

- MCP 服务只调用本地 `127.0.0.1` 端点，不连接远程服务器
- 远程 Minecraft 服务器仍然拥有最终权限判定
- 不绕过反作弊、区域保护或游戏规则

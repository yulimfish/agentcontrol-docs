# 版本更新记录

AgentControl 采用多仓库协同发布，版本号跟随 Fabric 模组主版本。MCP 服务和文档站同步更新。

---

## 0.1.4 — 2026-06-17

### 坐标级动作

**Fabric 模组**

- `break_block` 动作：传入方块坐标（x, y, z），自动对准方块中心并执行 `attackBlock`。比手动 `look_at` + 验证 + `break_crosshair` 三步流程高效得多。在生存模式下有效距离约 4.5 格。
- `move_to` 动作：传入目标 X/Z 坐标，自动计算方向、估算移动时间（~4.3 格/秒）、检测前方 1 格障碍并自动跳跃。只处理水平移动。

**MCP 服务**

- `mod_break_block`：坐标破坏工具，一步完成对准+破坏。推荐替代 `look_at` + `get_client_state`(验证) + `break_crosshair` 的三步流程。
- `mod_move_to`：坐标移动工具，自动方向+跳跃。推荐替代 `look_facing` + `mod_move_player`(手动估算时间) 的两步流程。

### 工具描述优化

- `mod_break_block`：标注为"PREFERRED METHOD"，说明覆盖方块处理流程（先 y+1 再 y）
- `mod_move_to`：标注为"PREFERRED METHOD"，包含坐标方向参考和移动后验证提醒
- `mod_move_player`：标注"for fine adjustments"，引导使用 `mod_move_to` 进行长距离导航
- `mod_break_crosshair_block`：标注"prefer mod_break_block"，明确适用场景

### 本次任务经验沉淀

1. 移动精度：`mod_move_player` 基于帧率，精度约 ±2 格。优先使用 `mod_move_to`
2. Z 轴方向：z 增加=南，z 减少=北。不要想当然地移动
3. 方块遮挡：目标方块被覆盖时（如草方块覆盖床），必须先破坏覆盖方块（y+1 位置）
4. 高效工具选择：破坏已知坐标 → `mod_break_block`；移动到坐标 → `mod_move_to`；搜索特定方块 → `get_client_state(filter="方块ID")`
5. 水中移动限制：`mod_move_to` 和 `mod_move_player` 基于地面行走机制（`KeyBinding.setPressed`）。水中前进=游泳（速度慢），水中跳跃=上浮（不是跳跃）。水中导航应使用 `mod_move_player` 手动控制，而非 `mod_move_to` 的自动跳跃逻辑

---

## 0.1.3 — 2026-06-17

### 方块属性识别

**Fabric 模组**

- `crosshairTarget` 返回方块属性：当准星命中方块时，返回 `properties` 字段，包含方块状态属性（如 `color: purple`、`facing: east`）。这允许 AI 区分同一方块 ID 的不同变体（如彩色潜影盒）。
- `nearbyBlocks` 支持 `filter` 参数：传入方块 ID 子串（如 `shulker_box`）可只返回匹配的方块，大幅减少响应数据量。

**MCP 服务**

- `get_client_state` 新增 `filter` 参数：高效搜索特定方块，避免被数千个 stone/dirt 淹没。
- 工具描述优化：所有工具描述强调高效工作流——使用 filter 搜索、一次性移动到位、验证 properties 再破坏。

### 工具描述更新

- `get_client_state`：添加 filter 使用说明、properties 字段含义
- `mod_move_player`：添加坐标方向参考（x 增加=东，z 增加=南）、移动速度说明（约 4-5 格/秒）
- `mod_look_at`：强调必须验证 properties.color 等属性、被阻挡时换角度
- `mod_break_crosshair_block`：强调必须验证 crosshairTarget.properties 再破坏

---

## 0.1.2 — 2026-06-17

### 准星对准精度修复

**Fabric 模组**

- `look_at` 动作现在对整数方块坐标自动加 0.5 偏移，对准方块中心而非方块边缘。这解决了射线从方块边缘穿过、错过非完整方块（如灯笼、告示牌）碰撞箱的问题。
- 视线高度计算修正：使用 `getEyePos()` 而不是 `getY()`，确保从眼睛位置而非脚部计算角度。

**MCP 服务**

- `mod_look_at` 传入整数方块坐标时，模组自动加 0.5 对准方块中心。如果传入小数坐标，保持原样。

**文档更新**

- API 参考文档更新：`look_at` 和 `look_facing` 说明更新，强调对准方块中心
- 新增最佳实践：破坏/放置方块前，必须通过 `crosshairTarget` 验证准星是否命中目标方块

---

## 0.1.1 — 2026-06-16

### 动作端点扩展

**新增动作类型**

| 动作 | 参数 | 说明 |
|------|------|------|
| `look_at` | `x`, `y`, `z` (double) | 对准指定世界坐标，自动计算 yaw/pitch |
| `look_facing` | `direction` (north/south/east/west/up/down) | 面朝指定方位 |

**使用场景**：
- `look_at`：破坏方块前，将准星对准目标方块中心
- `look_facing`：移动前，将玩家面朝指定方向（如面朝北前进）

### 自动化改进

**MCP 服务端自动关闭屏幕**

- 所有动作工具（`mod_move_player`, `mod_look`, `mod_attack` 等）现在在执行前自动关闭屏幕
- 无需 AI 手动检查 `screen` 状态
- 流程：检查 screen → close_screen → 如果未关闭 → release_mouse → 执行动作

**Fabric 模组修复**

- 修复 `close_screen` 对 ESC 菜单（`net.minecraft.class_433`）不生效的问题
- 现在先调用 `screen.close()` 再调用 `setScreen(null)`

### GitHub Actions 修复

- 修复 `.github/workflows/build-release.yml` 第 68 行 YAML 语法错误
- 使用 `cat > file << 'EOF'` 方式生成 release notes，避免 YAML 解析多行字符串问题

---

## 0.1.0 — 2026-06-16

### 状态端点扩展

**新增字段**

| 字段 | 说明 | 示例值 |
|------|------|--------|
| `facing` | 面朝方位 | `South` / `West` / `North` / `East` |
| `onGround` | 是否接触地面 | `true` / `false` |
| `health.oxygen` | 氧气值（水下） | `300`（满值） |
| `experience` | 经验等级和进度 | `{"level": 5, "progress": 0.3}` |
| `equipment` | 装备信息（头盔、胸甲、护腿、靴子、副手） | 完整物品对象 |
| `environment` | 环境信息 | `{"biome": "minecraft:forest", "timeOfDay": 6500, ...}` |
| `crosshairTarget.distance` | 准星目标距离 | `2.3` |
| `nearbyEntities[*].maxHealth` | 实体最大生命值 | `20.0` |
| `nearbyEntities[*].effects` | 实体状态效果 | `["minecraft:slowness"]` |
| `cache` | 世界缓存状态 | `{"enabled": true, "dimension": "minecraft:overworld", "blockCount": 12345}` |

**`environment` 详细字段**

- `biome` — 生物群系 ID（如 `minecraft:plains`）
- `timeOfDay` — 游戏时间（0-24000，6000 正午，18000 午夜）
- `weather.raining` — 是否下雨
- `weather.thundering` — 是否雷暴
- `lightLevel.blockLight` — 方块光照（0-15）
- `lightLevel.skyLight` — 天空光照（0-15）
- `lightLevel.rawLight` — 总光照（max(blockLight, skyLight)）

**`scanRadius` 参数**

状态端点新增 `scanRadius` 查询参数（1-16，默认 4），控制附近方块扫描范围。

```text
GET http://127.0.0.1:17777/state?scanRadius=8
```

### 操作端点扩展

**新增动作类型**

| 动作 | 参数 | 说明 |
|------|------|------|
| `select_slot` | `slot` (0-8) | 切换快捷栏槽位 |
| `drop` | `stack` (true/false) | 丢弃手持物品，支持整组或单个 |
| `swap_hands` | — | 主副手交换 |

### 世界缓存系统

- **新增** `AgentControlCache` 类：按维度（overworld/nether/end）隔离缓存
- **新增** 自动缓存已探索区域方块数据到 `.minecraft/agentcontrol-cache/`
- **新增** 每 tick 扫描玩家周围 5 格范围，自动记录新方块
- **新增** 每 30 秒或每新增 500 个方块触发异步保存
- **新增** 维度切换时自动保存旧缓存、加载新缓存
- **新增** 退出游戏时自动保存

### MCP 工具扩展

**新增工具**

| 工具 | 参数 | 说明 |
|------|------|------|
| `mod_select_slot` | `slot` (0-8) | 切换快捷栏槽位 |
| `mod_drop` | `stack` (true/false) | 丢弃手持物品 |
| `mod_swap_hands` | — | 主副手交换 |

**`get_client_state` 增强**

- 新增 `scan_radius` 可选参数（1-16），支持调整附近方块扫描范围
- 透传参数至 Fabric 状态端点

### 文档更新

- **新增** [API 参考文档](/guide/api-reference)：完整状态端点字段说明、动作端点参数表、响应示例、错误码
- **重写** [快速上手文档](/guide/quickstart)：新增验证步骤、扫描范围演示、12 个可直接使用的示例指令、世界缓存说明
- **更新** 首页 Features：新增"完整 API 文档"特性
- **扩展** [常见问题](/guide/faq)：新增扫描范围、缓存位置、缓存性能、scan_radius 参数等 4 个问题
- **新增** 版本更新记录页面（本文档）

---

## 0.0.1 — 2026-06-15（初始版本）

### 基础功能

**Fabric 模组**

- 本地 HTTP 服务器绑定 `127.0.0.1:17777`
- `/state` 端点：读取玩家坐标、朝向、血量、饥饿值、物品栏、准星目标、附近方块、附近实体
- `/action` 端点：执行移动（WASD/跳跃/潜行/疾跑）、视角调整、攻击、使用、破坏/放置方块、关闭界面、释放鼠标
- 可选 Mod Menu 集成：配置"Capture mouse on release action"
- 英文和简体中文本地化

**MCP 服务**

- 工具：`get_client_state`、`mod_move_player`、`mod_look`、`mod_attack`、`mod_use_item`、`mod_break_crosshair_block`、`mod_place_crosshair_block`、`mod_close_screen`、`mod_release_mouse`
- 旧的 macOS System Events 工具（`focus_minecraft`、`press_key`、`move_player`、`send_chat`、`send_command`）默认关闭
- 通过环境变量 `MINECRAFT_MCP_ENABLE_SYSTEM_INPUT=1` 启用旧工具
- 默认走 Fabric 模组通道，不依赖系统辅助功能

**文档站**

- VitePress 构建
- 首页 Hero + 6 个 Features
- 快速上手、安装指南、MCP 配置、安全边界、FAQ
- GitHub Actions 自动部署到 GitHub Pages

### 仓库发布

- 总仓：`https://github.com/yulimfish/agentcontrol`
- Fabric 副仓：`https://github.com/yulimfish/agentcontrol-fabric`
- MCP 副仓：`https://github.com/yulimfish/agentcontrol-mcp`
- Docs 副仓：`https://github.com/yulimfish/agentcontrol-docs`
- 所有子仓库 MIT 许可证

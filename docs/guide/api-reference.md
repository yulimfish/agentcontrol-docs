# API 参考

本文档详细说明 AgentControl Fabric 模组暴露的状态端点和动作端点的完整字段和参数。

## 状态端点

```text
GET http://127.0.0.1:17777/state
GET http://127.0.0.1:17777/state?scanRadius=8
```

### 查询参数

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| `scanRadius` | 整数 | 1-16 | 4 | 附近方块扫描半径。范围越大返回的方块信息越多，但 JSON 响应体积也越大。 |

### 响应字段

状态端点返回一个完整的 JSON 对象，包含以下顶层字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `inGame` | 布尔 | 是否已进入游戏世界 |
| `screen` | 字符串 | 当前打开的界面类名（无界面时为 `null`） |
| `dimension` | 字符串 | 当前维度 ID，如 `minecraft:overworld` |
| `position` | 对象 | 玩家坐标 |
| `rotation` | 对象 | 玩家朝向 |
| `facing` | 字符串 | 面朝方位：`South` / `West` / `North` / `East` |
| `onGround` | 布尔 | 是否接触地面 |
| `health` | 对象 | 生命值、饥饿值、氧气 |
| `experience` | 对象 | 经验等级和进度 |
| `inventory` | 对象 | 物品栏（36 槽位） |
| `equipment` | 对象 | 装备信息 |
| `environment` | 对象 | 环境信息（生物群系、天气、光照） |
| `crosshairTarget` | 对象 | 准星目标 |
| `nearbyBlocks` | 数组 | 附近方块列表 |
| `nearbyEntities` | 数组 | 附近实体列表 |
| `cache` | 对象 | 世界缓存状态 |

### 详细字段说明

#### `position` — 玩家坐标

```json
{
  "x": 128.500,
  "y": 64.000,
  "z": -256.300,
  "blockX": 128,
  "blockY": 64,
  "blockZ": -256
}
```

- `x` / `y` / `z`：精确坐标（小数点后 3 位）
- `blockX` / `blockY` / `blockZ`：所在方块坐标（整数）

#### `rotation` — 玩家朝向

```json
{
  "yaw": 45.000,
  "pitch": -10.500
}
```

- `yaw`：水平旋转角，-180° 到 +180°，0° 为正南
- `pitch`：垂直俯仰角，-90° 到 +90°

#### `health` — 生存状态

```json
{
  "health": 18.0,
  "maxHealth": 20.0,
  "food": 16,
  "oxygen": 300
}
```

- `health`：当前生命值（0-20，每心 2 点）
- `maxHealth`：最大生命值
- `food`：饥饿值（0-20）
- `oxygen`：氧气值（水下时递减，300 = 15 秒满值）

#### `experience` — 经验值

```json
{
  "level": 5,
  "progress": 0.3
}
```

- `level`：经验等级
- `progress`：当前等级进度（0.0-1.0）

#### `inventory` — 物品栏

```json
{
  "selectedSlot": 0,
  "items": [
    {
      "slot": 0,
      "id": "minecraft:oak_log",
      "name": "橡木原木",
      "count": 64,
      "damage": 0,
      "maxDamage": 0
    }
  ]
}
```

- `selectedSlot`：当前选中的快捷栏槽位（0-8）
- `items`：物品数组，每个物品包含：
  - `slot`：槽位索引（0-35，0-8 为快捷栏，9-35 为背包）
  - `id`：物品 ID（如 `minecraft:iron_pickaxe`）
  - `name`：物品显示名称
  - `count`：数量
  - `damage` / `maxDamage`：耐久值（仅可损坏物品有）

#### `equipment` — 装备信息

```json
{
  "head": { "id": "minecraft:iron_helmet", ... },
  "chest": { "id": "minecraft:iron_chestplate", ... },
  "legs": { "id": "minecraft:iron_leggings", ... },
  "feet": { "id": "minecraft:iron_boots", ... },
  "offHand": { "id": "minecraft:torch", ... }
}
```

- `head`：头盔
- `chest`：胸甲/鞘翅
- `legs`：护腿
- `feet`：靴子
- `offHand`：副手物品（为空时返回 `null`）

#### `environment` — 环境信息

```json
{
  "biome": "minecraft:forest",
  "timeOfDay": 6500,
  "weather": {
    "raining": false,
    "thundering": false
  },
  "lightLevel": {
    "blockLight": 0,
    "skyLight": 15,
    "rawLight": 15
  }
}
```

- `biome`：生物群系 ID（如 `minecraft:plains`、`minecraft:desert`）
- `timeOfDay`：游戏时间（0-24000，6000 正午，18000 午夜）
- `weather.raining`：是否下雨
- `weather.thundering`：是否雷暴
- `lightLevel.blockLight`：方块光照（火把等光源，0-15）
- `lightLevel.skyLight`：天空光照（0-15）
- `lightLevel.rawLight`：总光照（max(blockLight, skyLight)）

::: tip 提示
怪物在光照等级 ≤ 0 的区域（1.18+）才会生成。Agent 可以通过监控光照值判断夜间安全状况。
:::

#### `crosshairTarget` — 准星目标

准星射线检测返回三种类型：BLOCK、ENTITY、MISS。

**BLOCK 类型：**

```json
{
  "type": "block",
  "block": "minecraft:stone",
  "side": "EAST",
  "x": 129,
  "y": 64,
  "z": -256,
  "distance": 2.3,
  "solid": true
}
```

- `block`：方块 ID
- `side`：被击中的面：`UP`/`DOWN`/`NORTH`/`SOUTH`/`EAST`/`WEST`
- `x`/`y`/`z`：方块坐标
- `distance`：距玩家的距离
- `solid`：是否为固体方块

**ENTITY 类型：**

```json
{
  "type": "entity",
  "entity": "minecraft:zombie",
  "name": "僵尸",
  "health": 16.0,
  "maxHealth": 20.0,
  "distance": 3.5,
  "effects": ["minecraft:slowness"]
}
```

- `entity`：实体类型 ID
- `name`：实体名称
- `health` / `maxHealth`：生命值（非生物为 -1）
- `distance`：距玩家的距离
- `effects`：状态效果列表（如 `minecraft:poison`）

**MISS 类型：**返回 `null`。

#### `nearbyBlocks` — 附近方块

```json
[
  {
    "x": 128,
    "y": 64,
    "z": -256,
    "id": "minecraft:stone",
    "solid": true
  }
]
```

- `x`/`y`/`z`：方块坐标
- `id`：方块 ID
- `solid`：是否为固体方块

范围由 `scanRadius` 参数控制（默认 4 格，即 9×9×9 区域）。空气方块被省略以减少数据量。

#### `nearbyEntities` — 附近实体

```json
[
  {
    "id": 42,
    "type": "minecraft:zombie",
    "name": "僵尸",
    "x": 130.200,
    "y": 64.000,
    "z": -254.100,
    "distance": 2.5,
    "health": 16.0,
    "maxHealth": 20.0,
    "effects": []
  }
]
```

- `id`：实体运行时 ID
- `type`：实体类型 ID
- `name`：实体名称
- `x`/`y`/`z`：实体坐标
- `distance`：距玩家的距离
- `health` / `maxHealth`：生命值
- `effects`：状态效果列表

范围固定为 16 格半径。

#### `cache` — 世界缓存状态

```json
{
  "enabled": true,
  "dimension": "minecraft:overworld",
  "blockCount": 12345
}
```

- `enabled`：缓存是否已启用
- `dimension`：当前缓存对应的维度
- `blockCount`：已缓存的方块数量

---

## 动作端点

```text
GET http://127.0.0.1:17777/action?type=<action_type>&<params>
```

::: danger ⚠️ 前置条件：必须关闭游戏菜单
执行任何动作前，如果 Minecraft 的游戏菜单（ESC 暂停菜单）或其他界面已打开，必须先关闭界面。否则所有动作都会被 Minecraft 拦截，无法生效。

**正确流程**：
1. 先读取状态，检查 `screen` 字段是否为 `null`
2. 如果 `screen` 不为 `null`（如 `net.minecraft.class_433` 表示 ESC 菜单），先执行 `close_screen` 关闭界面
3. 如果 `close_screen` 后菜单仍未关闭（某些界面可能无法通过 `close_screen` 关闭），再执行 `release_mouse` 释放鼠标
4. 确认界面已关闭（再次读取状态，确认 `screen` 为 `null`）
5. 再执行目标动作
6. 动作完成后，再次读取状态确认效果

**原因**：Minecraft 在界面打开时会拦截所有移动和交互输入，导致动作无效。Agent 必须在执行动作前确保玩家处于"无界面"状态。
:::

| 类型 | 参数 | 说明 |
|------|------|------|
| `move` | `direction` (forward/back/left/right/jump/sneak/sprint), `durationMs` (50-10000, 默认 1000) | 移动或跳跃、潜行、疾跑 |
| `look` | `yaw` (-180-180), `pitch` (-90-90) | 设置视角朝向 |
| `attack` | — | 攻击实体或破坏方块 |
| `use` | — | 使用物品（进食、拉弓、右键交互） |
| `break_crosshair` | — | 破坏准星指向的方块 |
| `place_crosshair` | — | 在准星指向处放置方块或使用物品 |
| `select_slot` | `slot` (0-8) | 切换快捷栏槽位 |
| `drop` | `stack` (true/false, 默认 false) | 丢弃手持物品 |
| `swap_hands` | — | 主副手交换 |
| `close_screen` | — | 关闭当前界面 |
| `release_mouse` | — | 打开透明界面释放鼠标 |

### 动作示例

**移动 2 秒：**
```text
http://127.0.0.1:17777/action?type=move&direction=forward&durationMs=2000
```

**设置视角：**
```text
http://127.0.0.1:17777/action?type=look&yaw=90&pitch=0
```

**攻击：**
```text
http://127.0.0.1:17777/action?type=attack
```

**切换快捷栏槽位 3：**
```text
http://127.0.0.1:17777/action?type=select_slot&slot=3
```

**丢弃一组物品：**
```text
http://127.0.0.1:17777/action?type=drop&stack=true
```

### 响应格式

所有动作返回 JSON：

```json
{ "ok": true, "action": "move", "direction": "forward", "durationMs": 2000 }
```

失败时：

```json
{ "ok": false, "error": "not_in_game" }
```

常见错误码：
- `not_in_game`：玩家未进入游戏世界
- `bad_direction`：移动方向参数无效
- `no_block_target`：准星未指向方块
- `unknown_action`：动作类型不存在

---

## 健康检查端点

```text
GET http://127.0.0.1:17777/health
```

响应：
```json
{ "ok": true }
```

用于验证模组是否已加载并正在运行。

---

## 世界缓存说明

模组会自动缓存已探索区域的方块数据，按维度隔离存储：

```text
.minecraft/agentcontrol-cache/
  ├── overworld.json
  ├── nether.json
  └── end.json
```

- **自动更新**：每 tick 扫描玩家周围 5 格范围，自动记录新方块
- **自动保存**：每 30 秒或每新增 500 个方块触发异步保存
- **维度切换**：切换维度时自动保存旧缓存、加载新缓存
- **退出保存**：退出游戏时自动保存当前缓存

缓存文件格式为 JSON，包含 `x,y,z` → `block_id` 的映射。

缓存不影响游戏性能，所有写入操作在后台线程中执行。

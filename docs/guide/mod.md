# 安装 Fabric 模组

## 从 Releases 下载（推荐）

不需要自己编译。直接下载预构建的 jar：

1. 打开 [AgentControl-Fabric Releases](https://github.com/yulimfish/agentcontrol-fabric/releases)
2. 下载 `agentcontrol-fabric-x.x.x.jar`
3. 放入 `mods` 文件夹

::: warning 注意
不要安装 `*-sources.jar`，那是源码包，不会生效。
:::

## 环境要求

- Minecraft Java Edition `1.21.1`
- Fabric Loader `>=0.16.0`
- Fabric API（已包含在大多数 Fabric 配置中）
- Java `>=21`

## 可选：Mod Menu 集成

如果安装了 [Mod Menu](https://modrinth.com/mod/modmenu)，可以在 Mod Menu 中查看和配置 AgentControl：

- **设置项**: `Capture mouse on release action`
- **关闭**: 释放鼠标时打开透明界面，保持系统鼠标自由
- **开启**: 释放鼠标时让 Minecraft 重新捕获鼠标

配置保存在 `config/agentcontrol.properties`。

## 手动构建（开发者）

如果你需要修改源码并自行构建：

```sh
cd agentcontrol-fabric
gradle clean build
```

构建产物在 `build/libs/agentcontrol-fabric-0.1.0.jar`。

## 验证安装

模组加载成功后，会启动本地 HTTP 服务：

| 端点 | 地址 | 说明 |
|------|------|------|
| 状态 | `http://127.0.0.1:17777/state` | 读取玩家状态、环境、物品栏、装备、准星目标、附近方块/实体、世界缓存 |
| 动作 | `http://127.0.0.1:17777/action` | 执行移动、视角、攻击、使用、破坏/放置、快捷栏切换、丢弃、换手等 |
| 健康 | `http://127.0.0.1:17777/health` | 检查存活 |

状态端点支持 `scanRadius` 参数，可调整附近方块扫描范围：

```text
http://127.0.0.1:17777/state?scanRadius=8
```

范围：1-16，默认 4。更大的值返回更多信息，但 JSON 体积更大。

默认端口 `17777`。如需修改，启动 Minecraft 时添加参数：

```text
-DminecraftMcpStatePort=17778
```

## 世界缓存

模组会自动缓存已探索区域的方块数据到：

```text
.minecraft/agentcontrol-cache/<dimension>.json
```

- 按维度（overworld / nether / end）隔离缓存
- 每 30 秒或每新增 500 个方块自动保存一次
- 进入新世界时自动加载对应缓存
- 状态端点中 `cache` 字段显示当前缓存大小

## 安全说明

- 服务只绑定 `127.0.0.1`，不接受外部网络连接
- 不绕过服务器权限、反作弊或区域保护
- 只通过正常 Minecraft 客户端 API 执行操作

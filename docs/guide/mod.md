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
| 状态 | `http://127.0.0.1:17777/state` | 读取玩家状态 |
| 动作 | `http://127.0.0.1:17777/action` | 执行动作 |
| 健康 | `http://127.0.0.1:17777/health` | 检查存活 |

默认端口 `17777`。如需修改，启动 Minecraft 时添加参数：

```text
-DminecraftMcpStatePort=17778
```

## 安全说明

- 服务只绑定 `127.0.0.1`，不接受外部网络连接
- 不绕过服务器权限、反作弊或区域保护
- 只通过正常 Minecraft 客户端 API 执行操作

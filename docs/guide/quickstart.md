# 快速上手

AgentControl 由两部分组成：**Fabric 客户端模组**（运行在 Minecraft 里）和 **MCP 服务**（连接 AI 助手）。

## 第一步：安装 Fabric 模组（2 分钟）

::: tip 推荐方式
从 [GitHub Releases](https://github.com/yulimfish/agentcontrol-fabric/releases) 下载预构建的 jar 文件，不需要自己编译。
:::

### 操作步骤

1. 确认你的 Minecraft 启动器已安装 **Fabric Loader**（1.21.1 版本）
2. 访问 [AgentControl-Fabric Releases](https://github.com/yulimfish/agentcontrol-fabric/releases)
3. 下载最新版本的 `agentcontrol-fabric-*.jar`（不要下载 `*-sources.jar`）
4. 将 jar 放入 Minecraft 的 `mods` 文件夹：
   - Windows: `%appdata%\.minecraft\mods\`
   - macOS: `~/Library/Application Support/minecraft/mods/`
5. 启动 Minecraft 的 Fabric 配置
6. 进入游戏世界（单人或多人均可）

### 验证安装

进入游戏后，打开浏览器访问：

```text
http://127.0.0.1:17777/health
```

如果返回 `{"ok":true}`，说明模组已正常工作。

再测试状态端点：

```text
http://127.0.0.1:17777/state
```

你应该能看到完整的玩家状态 JSON，包含坐标、物品栏、环境信息等。

::: tip 调整扫描范围
状态端点支持 `scanRadius` 参数，可以调整附近方块扫描的范围：

```text
http://127.0.0.1:17777/state?scanRadius=8
```

范围 1-16，默认 4。更大的值能看到更多方块，但 JSON 响应会更大。
:::

---

## 第二步：配置 MCP 服务（一句话搞定）

::: tip 对 AI 助手说
"帮我安装 AgentControl MCP"
:::

AI 助手会自动完成以下配置：

1. 确认 `agentcontrol-mcp` 代码已下载到本地
2. 在 OpenCode 配置中添加 MCP 入口：
   ```jsonc
   "agentcontrol": {
     "type": "local",
     "command": ["node", "/path/to/agentcontrol-mcp/src/server.js"],
     "enabled": true
   }
   ```
3. 重启 OpenCode 使配置生效

### 手动配置（备选）

如果你需要手动配置，编辑 `~/.config/opencode/opencode.jsonc`：

```jsonc
{
  "mcp": {
    "agentcontrol": {
      "type": "local",
      "command": ["node", "/Users/yourname/agentcontrol-mcp/src/server.js"],
      "enabled": true
    }
  }
}
```

修改后**必须退出并重启 OpenCode**。

---

## 第三步：开始使用

重启后，对 AI 助手说：

### 基础状态查询

```text
读取我的 Minecraft 状态
```

AI 会返回你当前的坐标、血量、物品栏等信息。

### 调整扫描范围

```text
查看我周围 8 格范围内的所有方块
```

AI 会调用 `get_client_state` 并传入 `scan_radius=8`，返回更详细的附近方块列表。

### 基础移动

```text
让我的角色往前走 2 秒
```

```text
让我的角色潜行着慢慢走过去
```

```text
跳跃一下
```

### 视角调整

```text
看看我脚下的东西
```

```text
转向东边
```

### 交互操作

```text
破坏面前的方块
```

```text
把快捷栏第 3 格的泥土放下来
```

```text
把副手的火把插到墙上
```

### 物品管理

```text
切换到第 5 个快捷栏
```

```text
把手里的木头扔掉
```

```text
丢弃这一整组圆石
```

```text
主副手交换
```

---

## 第四步：了解世界缓存

模组会自动记住你走过的世界。在状态返回的 `cache` 字段中可以看到：

```json
{
  "cache": {
    "enabled": true,
    "dimension": "minecraft:overworld",
    "blockCount": 12345
  }
}
```

你可以问 AI：

```text
我现在探索了多少方块了？
```

```text
切换到下界后，我的世界缓存会怎么样？
```

AI 会告诉你：缓存按维度隔离，下界和主世界各自独立存储。进入不同维度时自动切换。

---

## 常见问题

**Q: 模组没有响应？**  
确认 Minecraft 已启动，且使用的是 Fabric 配置。检查浏览器能否访问 `http://127.0.0.1:17777/health`。

**Q: 状态端点返回的信息不够详细？**  
尝试在 URL 中添加 `?scanRadius=8`（或更大值）来获取更多附近方块。注意响应体积会增大。

**Q: MCP 工具不生效？**  
检查 OpenCode 配置中的命令路径是否正确指向 `agentcontrol-mcp/src/server.js`。修改后必须重启 OpenCode。

**Q: 可以多人服务器使用吗？**  
可以。AgentControl 只控制你自己的本地客户端，不涉及服务器插件。但服务器权限、反作弊等规则仍然生效。

**Q: 世界缓存会占用多少空间？**  
典型情况下，探索 1,000×1,000 方块区域约占用 50-100MB。缓存文件在 `.minecraft/agentcontrol-cache/` 目录中。

[查看 Mod 详细说明 →](/guide/mod)  
[查看 MCP 工具列表 →](/guide/mcp)  
[查看完整 API 参考 →](/guide/api-reference)

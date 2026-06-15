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
http://127.0.0.1:17777/state
```

如果看到 JSON 状态输出，说明模组已正常工作。

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

## 第三步：开始使用

重启后，对 AI 助手说：

```text
读取我的 Minecraft 状态
```

或

```text
让我的角色往前走 2 秒
```

如果 AI 返回了状态信息或执行了动作，说明一切就绪。

## 常见问题

**Q: 模组没有响应？**  
确认 Minecraft 已启动，且使用的是 Fabric 配置。检查浏览器能否访问 `http://127.0.0.1:17777/state`。

**Q: MCP 工具不生效？**  
检查 OpenCode 配置中的命令路径是否正确指向 `agentcontrol-mcp/src/server.js`。修改后必须重启 OpenCode。

**Q: 可以多人服务器使用吗？**  
可以。AgentControl 只控制你自己的本地客户端，不涉及服务器插件。但服务器权限、反作弊等规则仍然生效。

[查看 Mod 详细说明 →](/guide/mod)  
[查看 MCP 详细说明 →](/guide/mcp)

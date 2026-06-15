# 常见问题

## 模组相关

**Q: 模组无法加载？**  
确认你的 Minecraft 是 `1.21.1` 版本，且 Fabric Loader `>=0.16.0` 已安装。检查 `mods` 文件夹里只有 `agentcontrol-fabric-*.jar`，没有 `*-sources.jar`。

**Q: 浏览器访问 `127.0.0.1:17777` 无响应？**  
确认 Minecraft 已经启动，并且你已进入游戏世界（主菜单或游戏内均可）。检查是否有其他程序占用了 `17777` 端口。

**Q: 如何修改端口？**  
启动 Minecraft 时添加 JVM 参数：`-DminecraftMcpStatePort=17778`，然后同步修改 MCP 的环境变量。

## MCP 相关

**Q: 工具列表里没有 AgentControl？**  
修改 OpenCode 配置后**必须退出并重启**，配置不会热加载。检查 `opencode.jsonc` 语法是否正确（特别是逗号和引号）。

**Q: MCP 提示无法连接到 Fabric？**  
确认 Minecraft 已启动且模组已加载。检查浏览器是否能访问 `http://127.0.0.1:17777/state`。如果 Fabric 模组使用自定义端口，需要设置对应的环境变量。

**Q: 旧工具（如 `focus_minecraft`）不见了？**  
这些 macOS 系统输入工具默认已关闭。如需临时启用，启动 MCP 时设置 `MINECRAFT_MCP_ENABLE_SYSTEM_INPUT=1`。

**Q: 可以配合其他 MCP 一起使用吗？**  
可以。AgentControl 的 MCP 工具名都有 `mod_` 前缀，不会与其他工具冲突。

## 其他

**Q: 支持哪些 Minecraft 版本？**  
当前构建目标是 `1.21.1`。如需其他版本，需要修改 `agentcontrol-fabric/gradle.properties` 中的 Yarn/Fabric API 版本并重新构建。

**Q: 会支持 Forge 吗？**  
当前只支持 Fabric。Forge 版本暂未计划，如有需求可以开 issue 讨论。

**Q: 文档站的更新频率？**  
文档站通过 GitHub Actions 自动构建，每次提交到 `main` 分支后约 1-2 分钟内自动更新。

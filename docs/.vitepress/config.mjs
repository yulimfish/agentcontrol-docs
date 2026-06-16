import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AgentControl',
  description: '让 AI 控制你的 Minecraft 客户端',
  base: '/agentcontrol-docs/',
  
  themeConfig: {

    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/guide/quickstart' },
      { text: 'GitHub', link: 'https://github.com/yulimfish/agentcontrol' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '安装 Fabric 模组', link: '/guide/mod' },
            { text: '配置 MCP 服务', link: '/guide/mcp' }
          ]
        },
        {
          text: '参考',
          items: [
            { text: 'API 参考', link: '/guide/api-reference' },
            { text: '版本更新记录', link: '/guide/changelog' },
            { text: '安全边界', link: '/guide/safety' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yulimfish/agentcontrol' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 AgentControl 贡献者'
    },

    search: {
      provider: 'local'
    }
  }
})

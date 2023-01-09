import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Admin',
  description: 'Just playing around.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/API/', activeMatch: '/API/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsible: true,
          items: [
            { text: '開始', link: '/guide/index.md' },
            { text: '系統圖示', link: '/guide/icon.md' },
            { text: '系統路由', link: '/guide/router.md' },
            { text: '系統請求', link: '/guide/request.md' },
          ]
        }
      ],
      '/API/': [
        {
          text: 'API',
          collapsible: true,
          items: [
            { text: '開始', link: '/API/index.md' },
          ]
        }
      ]
    }
  }
})


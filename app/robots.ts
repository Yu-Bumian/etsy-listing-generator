import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 允许所有爬虫
      allow: '/',     // 允许访问所有页面
    },
    // 注意：上线后要把这里的域名换成您真实的 Vercel 域名
    // 暂时先写个占位符，或者等拿到域名后再回来改
    sitemap: 'https://shoplistingai.com/sitemap.xml',
  }
}
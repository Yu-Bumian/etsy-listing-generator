import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.vercel.app', // 上线后记得换成真实域名
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shoplistingai.com', // 上线后记得换成真实域名
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
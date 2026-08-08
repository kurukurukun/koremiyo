import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.koremiyo.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*?*', // Prevent indexing search query parameter URLs
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

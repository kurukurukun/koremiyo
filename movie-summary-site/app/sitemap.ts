import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/data/articles';
import { knownMovieIds } from '@/lib/data/movie_ids';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.koremiyo.com';
  const articles = getArticles();

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quickpick`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Article routes
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Movie detail routes (dynamic SEO URLs)
  const movieRoutes = knownMovieIds.map((movie) => ({
    url: `${baseUrl}/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...movieRoutes];
}

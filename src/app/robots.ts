import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/cuenta'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
      },
      {
        userAgent: ['ClaudeBot', 'Claude-User'],
        allow: '/',
      },
      {
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.advancedhealth.com.co/sitemap.xml',
  };
}

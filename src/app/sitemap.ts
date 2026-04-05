import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://www.advancedhealth.com.co';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages in both languages
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' as const },
    { path: '/productos', priority: 0.9, changefreq: 'daily' as const },
    { path: '/blog', priority: 0.8, changefreq: 'daily' as const },
    { path: '/nosotros', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/soporte', priority: 0.5, changefreq: 'monthly' as const },
    { path: '/terminos', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/politicas-de-privacidad', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/derecho-de-retracto', priority: 0.3, changefreq: 'yearly' as const },
  ];

  const locales = ['es', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each static page x locale
  for (const page of staticPages) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
      });
    }
  }

  // Fetch blog posts from Supabase
  try {
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at, created_at')
      .order('created_at', { ascending: false });

    if (blogs) {
      for (const post of blogs) {
        for (const lang of locales) {
          entries.push({
            url: `${BASE_URL}/${lang}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.created_at),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }
    }
  } catch {
    // If Supabase fails, continue with static pages only
  }

  return entries;
}

import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.advancedhealth.com.co';
const FIRST_PAGE_SIZE = 5;
const SUBSEQUENT_PAGE_SIZE = 6;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  const title = isEn
    ? 'Blog — Science, Wellness & Clinical Nutrition'
    : 'Blog — Ciencia, Bienestar y Nutrición Clínica';
  const description = isEn
    ? 'Evidence-based articles on collagen, vitamins, adaptogens, gut health, and clinical nutrition. Written by the Advanced Health science team.'
    : 'Artículos basados en evidencia sobre colágeno, vitaminas, adaptógenos, salud intestinal y nutrición clínica. Escritos por el equipo científico de Advanced Health.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: {
        es: `${BASE_URL}/es/blog`,
        en: `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/es/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/blog`,
      locale: isEn ? 'en_US' : 'es_CO',
      type: 'website',
      images: [{ url: `${BASE_URL}/logo-advanced-health-COLOR_HORIZONTAL.png`, width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
    },
  };
}


export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { lang } = await params;
  const { page, category } = await searchParams;
  const currentPage = parseInt(page || '1');
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.blog;

  // ═══ FETCH UNIQUE CATEGORIES ═══
  const { data: catData } = await supabase.from('blogs').select('category_es, category_en');
  const dbCategories = Array.from(new Set(catData?.map(c => lang === 'en' ? c.category_en : c.category_es).filter(Boolean) || []));
  const dynamicCategories = [t.tags[0], ...dbCategories];

  // ═══ FETCH DATA FROM SUPABASE ═══
  const offset = currentPage === 1 ? 0 : FIRST_PAGE_SIZE + (currentPage - 2) * SUBSEQUENT_PAGE_SIZE;
  const pageSize = currentPage === 1 ? FIRST_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;

  let query = supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (category && category !== t.tags[0]) {
    const catField = lang === 'en' ? 'category_en' : 'category_es';
    query = query.eq(catField, category);
  }

  const { data: blogs, count, error } = await query.range(offset, offset + pageSize - 1);

  console.log('--- BLOG DEBUG ---');
  console.log('Current Page:', currentPage);
  console.log('Offset:', offset);
  console.log('Page Size:', pageSize);
  console.log('Blogs Found:', blogs?.length);
  console.log('Total Count:', count);

  if (error || !blogs) {

    console.error('Error fetching blogs:', error);
    return <div>Error loading blogs</div>;
  }

  const totalCount = count || 0;
  const totalPages = totalCount <= FIRST_PAGE_SIZE ? 1 : 1 + Math.ceil((totalCount - FIRST_PAGE_SIZE) / SUBSEQUENT_PAGE_SIZE);

  const featured = blogs && blogs.length > 0 ? blogs[0] : null;
  const rest = featured ? blogs.filter(b => b.id !== featured.id) : [];

  // Helper to get localized fields
  const getField = (obj: any, field: string) => obj[`${field}_${lang}`] || obj[`${field}_es`];

  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <div style={{ padding: '4rem 2rem 3rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-label)', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem' }}>
          {t.badge}
        </span>
        <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--on-surface)' }}>
          {t.title} <span style={{ color: 'var(--accent)' }}>{t.title_highlight}</span>
        </h1>
      </div>

      {/* ═══ TAG FILTER ═══ */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 2rem 4rem', display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
        {dynamicCategories.map((cat: string) => {
          const isAll = cat === t.tags[0];
          const href = isAll ? `/${lang}/blog` : `/${lang}/blog?category=${cat}`;
          const isSelected = category === cat || (!category && isAll);

          return (
            <Link
              key={cat}
              href={href}
              style={{
                background: isSelected ? 'var(--primary)' : 'var(--surface-container)',
                color: isSelected ? '#ffffff' : 'var(--on-surface-variant)',
                border: 'none', padding: '0.5rem 1.25rem', borderRadius: '9999px',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                textDecoration: 'none'
              }}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 2rem 8rem' }}>
        {/* ═══ FEATURED ARTICLE ═══ */}
        {featured && currentPage === 1 && (
          <article
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginBottom: '6rem', border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
            className="featured-article"
          >
            <div style={{ position: 'relative', minHeight: '480px', overflow: 'hidden' }}>
              <img src={featured.img} alt={getField(featured, 'title')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--primary)', color: '#ffffff', fontSize: '0.625rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {t.featured_badge}
              </div>
            </div>
            <div style={{ padding: '4rem', background: 'var(--surface-container-low)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem' }}>
                {getField(featured, 'category')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
                {getField(featured, 'title')}
              </h2>
              <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {getField(featured, 'excerpt')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>
                  {new Date(featured.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · {featured.read_time} {t.reading_suffix}
                </p>
                <Link href={`/${lang}/blog/${featured.slug}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {t.read_more} <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* ═══ ARTICLE GRID ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }} className="blog-grid">
          {(currentPage === 1 ? rest : blogs).map((article) => (
            <article key={article.id} style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '3rem' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <img src={article.img} alt={getField(article, 'title')} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="blog-img" />
              </div>
              <span style={{ display: 'inline-block', fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.75rem' }}>
                {getField(article, 'category')}
              </span>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.375rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--on-surface)', marginBottom: '0.75rem' }}>
                {getField(article, 'title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {getField(article, 'excerpt')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>
                  {new Date(article.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · {article.read_time}
                </p>
                <Link href={`/${lang}/blog/${article.slug}`} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {t.read} <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ═══ PAGINATION ═══ */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '6rem' }}>
            {currentPage > 1 && (
              <Link
                href={`/${lang}/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
                style={{
                  padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)',
                  color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--on-surface-variant)', fontWeight: 600 }}>
              {currentPage} / {totalPages}
            </div>
            {currentPage < totalPages && (
              <Link
                href={`/${lang}/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
                style={{
                  padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)',
                  color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        .featured-article { grid-template-columns: 1fr 1fr; }
        .blog-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 900px) {
          .featured-article { grid-template-columns: 1fr !important; }
          .featured-article > div:first-child { min-height: 280px !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        article:hover .blog-img { transform: scale(1.08); }
      `}</style>
    </>
  );
}

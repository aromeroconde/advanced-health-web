import { getDictionary } from '@/lib/dictionaries';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.advancedhealth.com.co';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;

    const { data: post } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!post) return { title: 'Post no encontrado' };

    const getField = (obj: any, field: string) => obj[`${field}_${lang}`] || obj[`${field}_es`];
    const title = getField(post, 'title');
    const description = getField(post, 'excerpt');
    const isEn = lang === 'en';

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/blog/${slug}`,
            languages: {
                es: `${BASE_URL}/es/blog/${slug}`,
                en: `${BASE_URL}/en/blog/${slug}`,
                'x-default': `${BASE_URL}/es/blog/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${lang}/blog/${slug}`,
            locale: isEn ? 'en_US' : 'es_CO',
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.updated_at || post.created_at,
            images: post.img ? [{ url: post.img, width: 1200, height: 630, alt: title }] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as 'es' | 'en');
    const t = dict.blog;

    const { data: post, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    const getField = (obj: any, field: string) => obj[`${field}_${lang}`] || obj[`${field}_es`];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 8rem' }}>
            {/* BlogPosting Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: getField(post, 'title'),
                        description: getField(post, 'excerpt'),
                        image: post.img,
                        datePublished: post.created_at,
                        dateModified: post.updated_at || post.created_at,
                        author: {
                            '@type': 'Organization',
                            '@id': `${BASE_URL}/#organization`,
                        },
                        publisher: {
                            '@id': `${BASE_URL}/#organization`,
                        },
                        inLanguage: lang,
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `${BASE_URL}/${lang}/blog/${slug}`,
                        },
                    }),
                }}
            />
            <Link
                href={`/${lang}/blog`}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: 'var(--primary)', textDecoration: 'none', fontWeight: 600,
                    marginBottom: '3rem', fontSize: '0.875rem'
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
                {t.back_to_blog}
            </Link>

            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem' }}>
                {getField(post, 'category')}
            </span>

            <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--on-surface)', marginBottom: '2rem' }}>
                {getField(post, 'title')}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem', color: 'var(--outline)' }}>
                <p style={{ fontSize: '0.875rem' }}>
                    {new Date(post.created_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <span>•</span>
                <p style={{ fontSize: '0.875rem' }}>{post.read_time} {t.reading_suffix}</p>
            </div>

            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '4rem' }}>
                <img src={post.img} alt={getField(post, 'title')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div
                style={{
                    fontFamily: 'var(--font-body)', fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--on-surface-variant)',
                    display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}
            >
                {/* For now, we render the excerpt and a placeholder for full content since we only have excerpt in migration */}
                <p style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--on-surface)', marginBottom: '1rem' }}>
                    {getField(post, 'excerpt')}
                </p>

                {/* Render full content as Markdown */}
                <div className="blog-content">
                    <ReactMarkdown>{getField(post, 'content')}</ReactMarkdown>
                </div>
            </div>

            <style>{`
                .blog-content {
                    line-height: 1.8;
                }
                .blog-content h2, .blog-content h3 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--on-surface);
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                }
                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: var(--radius-md);
                    margin: 2rem 0;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
            `}</style>

            <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--outline-variant)' }}>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>{t.share_article}</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                        { platform: 'facebook', icon: 'share' },
                        { platform: 'twitter', icon: 'nest_eco_leaf' }, // Using available material symbols as placeholders for premium feel
                        { platform: 'linkedin', icon: 'clinical_notes' }
                    ].map(item => (
                        <button
                            key={item.platform}
                            className="share-btn"
                            style={{
                                width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                                border: '1px solid var(--outline-variant)', background: 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'all 0.2s', color: 'var(--primary)'
                            }}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </button>
                    ))}
                </div>
            </div>
            <style>{`
                .share-btn:hover {
                    background: var(--primary) !important;
                    color: #ffffff !important;
                }
            `}</style>
        </div>
    );
}

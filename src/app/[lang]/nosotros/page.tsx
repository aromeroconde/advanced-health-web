import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';

const valueIcons = ['biotech', 'humidity_high', 'psychology'];

export default async function Nosotros({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'es' | 'en');
    const t = dict.nosotros as Record<string, any>;

    return (
        <div style={{ background: 'var(--surface)' }}>
            {/* ═══ HERO SECTION ═══ */}
            <section
                style={{
                    padding: '10rem 2rem 6rem',
                    background: 'var(--surface-container-low)',
                    textAlign: 'center',
                }}
            >
                <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                    <span
                        style={{
                            display: 'block',
                            fontFamily: 'var(--font-label)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--primary)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {t.badge} <span style={{ color: 'var(--primary)' }}>{t.badge_highlight}</span>
                    </span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-headline)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            color: 'var(--on-surface)',
                            marginBottom: '2rem',
                        }}
                    >
                        {t.title_1} <br />
                        <span style={{ color: 'var(--outline-variant)' }}>{t.title_mid}</span> {t.title_connector} <span style={{ color: 'var(--primary)' }}>{t.title_highlight}</span>
                    </h1>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.25rem',
                            color: 'var(--on-surface-variant)',
                            lineHeight: 1.7,
                            maxWidth: '36rem',
                            margin: '0 auto',
                        }}
                    >
                        {t.desc}
                    </p>
                </div>
            </section>

            {/* ═══ STORY SECTION ═══ */}
            <section style={{ padding: '8rem 2rem' }}>
                <div
                    style={{
                        maxWidth: 'var(--container-max)',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '6rem',
                        alignItems: 'center',
                    }}
                    className="story-grid"
                >
                    <div
                        style={{
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-xl)',
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=85&fit=crop"
                            alt="Lab"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                    <div>
                        <h2
                            style={{
                                fontFamily: 'var(--font-headline)',
                                fontSize: '2.5rem',
                                marginBottom: '2rem',
                            }}
                        >
                            {t.story_title} <span style={{ color: 'var(--primary)' }}>{t.story_highlight}</span>
                        </h2>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                color: 'var(--on-surface-variant)',
                                fontFamily: 'var(--font-body)',
                                lineHeight: 1.8,
                            }}
                        >
                            <p>{t.story_p1}</p>
                            <p>{t.story_p2}</p>
                            <p>{t.story_p3}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ VALUES SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-lowest)' }}>
                <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.values_title} <span style={{ color: 'var(--primary)' }}>{t.values_highlight}</span></h2>
                        <div style={{ width: '4rem', height: '4px', background: 'var(--primary)', margin: '0 auto' }} />
                    </div>

                    <div
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}
                        className="values-grid"
                    >
                        {t.values.map((val: { title: string; desc: string }, idx: number) => (
                            <div
                                key={val.title}
                                style={{
                                    background: 'var(--surface-container-low)',
                                    padding: '3rem',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'transform var(--transition-base)',
                                }}
                                className="value-card"
                            >
                                <div
                                    style={{
                                        width: '4rem',
                                        height: '4rem',
                                        background: 'var(--primary-container)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: 'var(--on-primary-container)', fontSize: '2rem' }}>
                                        {valueIcons[idx]}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{val.title}</h3>
                                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t.cta}</h2>
                <Link href={`/${lang}/productos`} className="btn btn-primary">
                    {t.cta_btn}
                </Link>
            </section>

            <style>{`
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .values-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        .value-card:hover { transform: translateY(-8px); }
      `}</style>
        </div>
    );
}

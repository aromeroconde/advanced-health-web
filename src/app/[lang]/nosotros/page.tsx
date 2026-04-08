import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.advancedhealth.com.co';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';
    const title = isEn ? 'About Us' : 'Nosotros';
    const description = isEn
        ? 'Advanced Health Company SAS: Clinical nutrition leaders in Colombia. 6+ years of experience, science-backed supplements with INVIMA registration.'
        : 'Advanced Health Company SAS: Líderes en nutrición clínica en Colombia. Más de 6 años de experiencia, suplementos respaldados por ciencia con registro INVIMA vigente.';

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/nosotros`,
            languages: {
                es: `${BASE_URL}/es/nosotros`,
                en: `${BASE_URL}/en/nosotros`,
                'x-default': `${BASE_URL}/es/nosotros`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${lang}/nosotros`,
            locale: isEn ? 'en_US' : 'es_CO',
            type: 'website',
            images: [{ url: `${BASE_URL}/logo-advanced-health-COLOR_HORIZONTAL.png`, width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
        },
    };
}

export default async function Nosotros({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'es' | 'en');
    const t = dict.nosotros as Record<string, any>;

    const stats = [
        { num: t.stats_years_num, label: t.stats_years_label },
        { num: t.stats_products_num, label: t.stats_products_label },
        { num: t.stats_cities_num, label: t.stats_cities_label },
        { num: t.stats_clients_num, label: t.stats_clients_label },
    ];

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

            {/* ═══ STATS BAR ═══ */}
            <section
                style={{
                    background: 'var(--primary)',
                    padding: '4rem 2rem',
                }}
            >
                <div
                    style={{
                        maxWidth: 'var(--container-max)',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2rem',
                        textAlign: 'center',
                    }}
                    className="stats-grid"
                >
                    {stats.map((s, i) => (
                        <div key={i}>
                            <div
                                style={{
                                    fontFamily: 'var(--font-headline)',
                                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                    fontWeight: 700,
                                    color: '#fff',
                                    lineHeight: 1,
                                }}
                            >
                                {s.num}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-label)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.7)',
                                    marginTop: '0.75rem',
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ MISSION / STORY SECTION ═══ */}
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
                            alt="Laboratorio de investigación científica"
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
                            {t.mission_title} <span style={{ color: 'var(--primary)' }}>{t.mission_highlight}</span>
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
                            <p>{t.mission_p1}</p>
                            <p>{t.mission_p2}</p>
                            <p>{t.mission_p3}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ VALUES SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-lowest)' }}>
                <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            {t.values_title} <span style={{ color: 'var(--primary)' }}>{t.values_highlight}</span>
                        </h2>
                        <div style={{ width: '4rem', height: '4px', background: 'var(--primary)', margin: '0 auto' }} />
                    </div>

                    <div
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
                        className="values-grid"
                    >
                        {t.values.map((val: { title: string; desc: string; icon: string }) => (
                            <div
                                key={val.title}
                                style={{
                                    background: 'var(--surface-container-low)',
                                    padding: '2.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'transform var(--transition-base)',
                                }}
                                className="value-card"
                            >
                                <div
                                    style={{
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        background: 'var(--primary-container)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: 'var(--on-primary-container)', fontSize: '1.75rem' }}>
                                        {val.icon}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-headline)' }}>{val.title}</h3>
                                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6, fontSize: '0.95rem' }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ BRANDS SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-low)' }}>
                <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            {t.brands_title} <span style={{ color: 'var(--primary)' }}>{t.brands_highlight}</span>
                        </h2>
                        <p style={{ color: 'var(--on-surface-variant)', maxWidth: '32rem', margin: '0 auto', lineHeight: 1.7 }}>
                            {t.brands_desc}
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {/* FuXion */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1.2fr',
                                gap: '0',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: '#fff',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'box-shadow var(--transition-base)',
                            }}
                            className="brand-showcase"
                        >
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4rem 3rem',
                                    minHeight: '280px',
                                }}
                            >
                                <img
                                    src="/logo-fuxion.png"
                                    alt="Logo FuXion"
                                    style={{ maxWidth: '260px', width: '100%', height: 'auto', filter: 'brightness(0) invert(1)' }}
                                />
                            </div>
                            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-headline)', marginBottom: '1rem' }}>{t.brands_fuxion_name}</h3>
                                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t.brands_fuxion_desc}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.375rem 1rem',
                                        background: 'var(--primary-container)',
                                        color: 'var(--on-primary-container)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        INVIMA
                                    </span>
                                    <span style={{
                                        padding: '0.375rem 1rem',
                                        background: 'var(--primary-container)',
                                        color: 'var(--on-primary-container)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        {lang === 'es' ? 'Nutrición Funcional' : 'Functional Nutrition'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* gudd */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 1fr',
                                gap: '0',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: '#fff',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'box-shadow var(--transition-base)',
                            }}
                            className="brand-showcase"
                        >
                            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-headline)', marginBottom: '1rem' }}>{t.brands_gudd_name}</h3>
                                <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t.brands_gudd_desc}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.375rem 1rem',
                                        background: 'var(--primary-container)',
                                        color: 'var(--on-primary-container)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        INVIMA
                                    </span>
                                    <span style={{
                                        padding: '0.375rem 1rem',
                                        background: 'var(--primary-container)',
                                        color: 'var(--on-primary-container)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        {lang === 'es' ? 'Suplementos Alimenticios' : 'Dietary Supplements'}
                                    </span>
                                    <span style={{
                                        padding: '0.375rem 1rem',
                                        background: 'var(--primary-container)',
                                        color: 'var(--on-primary-container)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        {lang === 'es' ? 'Bienestar del Adulto Mayor' : 'Senior Wellness'}
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    background: '#c1f0d1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4rem 3rem',
                                    minHeight: '280px',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    maxWidth: '340px',
                                    padding: '1rem'
                                }}>
                                    <img
                                        src="/logo-gudd-new.png"
                                        alt="Logo gudd"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ COVERAGE SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-lowest)' }}>
                <div
                    style={{
                        maxWidth: 'var(--container-max)',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '6rem',
                        alignItems: 'center',
                    }}
                    className="coverage-grid"
                >
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                            {t.coverage_title} <span style={{ color: 'var(--primary)' }}>{t.coverage_highlight}</span>
                        </h2>
                        <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                            {t.coverage_desc}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[t.coverage_feature1, t.coverage_feature2, t.coverage_feature3, t.coverage_feature4].map((feat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>
                                        check_circle
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--on-surface)', fontWeight: 500 }}>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-xl)',
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=85&fit=crop"
                            alt="Logística y envíos a todo Colombia"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ CTA SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontFamily: 'var(--font-headline)',
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {t.cta_title}
                    </h2>
                    <p
                        style={{
                            color: 'var(--on-surface-variant)',
                            fontSize: '1.1rem',
                            lineHeight: 1.7,
                            marginBottom: '3rem',
                        }}
                    >
                        {t.cta_desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <Link href={`/${lang}/productos`} className="btn btn-primary">
                            {t.cta_btn}
                        </Link>
                        <a
                            href="https://wa.me/576019178558?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20por%20favor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            {t.cta_whatsapp}
                        </a>
                    </div>
                </div>
            </section>

            <style>{`
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .values-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .brands-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .coverage-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2.5rem !important; }
        }
        .value-card:hover { transform: translateY(-8px); }
        .brand-card:hover { box-shadow: var(--shadow-lg); }
      `}</style>
        </div>
    );
}

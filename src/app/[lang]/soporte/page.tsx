'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import FAQSchema from '@/components/FAQSchema';

export default function SoportePage() {
    const [submitted, setSubmitted] = useState(false);
    const pathname = usePathname();
    const lang = pathname.startsWith('/en') ? 'en' : 'es';

    const [t, setT] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        import(`@/dictionaries/${lang}.json`).then((mod) => setT(mod.default.soporte));
    }, [lang]);

    if (!t) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ background: 'var(--surface)' }}>
            {/* FAQ Schema for search engines */}
            <FAQSchema faqs={t.faqs} />
            {/* ═══ HERO SECTION ═══ */}
            <section
                style={{
                    padding: '10rem 2rem 6rem',
                    background: 'var(--primary)',
                    color: '#fff',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 0, transparent 20px)',
                    }}
                />
                <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h1
                        style={{
                            fontFamily: 'var(--font-headline)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '2rem',
                        }}
                    >
                        {t.title}
                    </h1>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.25rem',
                            color: 'rgba(255,255,255,0.8)',
                            maxWidth: '32rem',
                            margin: '0 auto',
                        }}
                    >
                        {t.desc}
                    </p>
                </div>
            </section>

            {/* ═══ MAIN CONTENT ═══ */}
            <section style={{ padding: '8rem 2rem' }}>
                <div
                    style={{
                        maxWidth: 'var(--container-max)',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 0.8fr',
                        gap: '8rem',
                    }}
                    className="support-grid"
                >
                    {/* FAQ COLUMN */}
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>{t.faq_title} <span style={{ color: 'var(--primary)' }}>{t.faq_highlight}</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {t.faqs.map((item: { q: string; a: string }, idx: number) => (
                                <details
                                    key={idx}
                                    style={{
                                        padding: '2rem',
                                        background: 'var(--surface-container-low)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                    }}
                                    className="faq-item"
                                >
                                    <summary
                                        style={{
                                            fontFamily: 'var(--font-headline)',
                                            fontWeight: 700,
                                            fontSize: '1.125rem',
                                            color: 'var(--on-surface)',
                                            listStyle: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {item.q}
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                                            add
                                        </span>
                                    </summary>
                                    <p
                                        style={{
                                            marginTop: '1.5rem',
                                            color: 'var(--on-surface-variant)',
                                            lineHeight: 1.6,
                                            fontFamily: 'var(--font-body)',
                                        }}
                                    >
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT FORM COLUMN */}
                    <div>
                        <div
                            style={{
                                background: 'var(--surface-container-highest)',
                                padding: '3.5rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                        >
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>{t.form_title}</h2>

                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                        check_circle
                                    </span>
                                    <h3 style={{ marginBottom: '1rem' }}>{t.form_success_title}</h3>
                                    <p style={{ color: 'var(--on-surface-variant)' }}>{t.form_success_desc}</p>
                                    <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setSubmitted(false)}>{t.form_another}</button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                                >
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>{t.form_name}</label>
                                        <input required type="text" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff' }} placeholder={t.form_name_ph} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>{t.form_email}</label>
                                        <input required type="email" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff' }} placeholder={t.form_email_ph} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>{t.form_message}</label>
                                        <textarea required rows={5} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff', resize: 'vertical' }} placeholder={t.form_message_ph}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.form_submit}</button>
                                </form>
                            )}
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>mail</span>
                                <span style={{ fontWeight: 600 }}>contacto@advancedhealth.com.co</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>chat</span>
                                <span style={{ fontWeight: 600 }}>WhatsApp & Phone: (+57) 601 917 8558</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        @media (max-width: 1024px) {
          .support-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        details summary::-webkit-details-marker { display: none; }
        .faq-item[open] summary span { transform: rotate(45deg); transition: transform 0.2s; }
        .faq-item summary span { transition: transform 0.2s; }
      `}</style>
        </div>
    );
}

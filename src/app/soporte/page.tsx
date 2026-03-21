'use client';

import { useState } from 'react';

export default function SoportePage() {
    const [submitted, setSubmitted] = useState(false);

    const faqs = [
        {
            q: '¿Cómo puedo rastrear mi pedido?',
            a: 'Una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de guía y un enlace para el seguimiento en tiempo real.',
        },
        {
            q: '¿Los productos tienen registro sanitario?',
            a: 'Sí, absolutamente todos nuestros productos cuentan con registro INVIMA vigente y cumplen con los más altos estándares de calidad.',
        },
        {
            q: '¿Hacen envíos a todo el país?',
            a: 'Realizamos envíos a todas las ciudades principales e intermedias de Colombia a través de nuestros aliados logísticos.',
        },
        {
            q: '¿Cuál es la política de devoluciones?',
            a: 'Si no estás satisfecho con tu compra, tienes hasta 30 días para solicitar un cambio o devolución de dinero, siempre que el producto esté sellado.',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ background: 'var(--surface)' }}>
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
                        Estamos para Ayudarte.
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
                        ¿Tienes alguna duda técnica o sobre tu pedido? Nuestro equipo clínico y de soporte está listo para asistirte.
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
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Preguntas <span style={{ color: 'var(--primary)' }}>Frecuentes</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {faqs.map((item, idx) => (
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
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Escríbenos</h2>

                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                        check_circle
                                    </span>
                                    <h3 style={{ marginBottom: '1rem' }}>¡Mensaje Recibido!</h3>
                                    <p style={{ color: 'var(--on-surface-variant)' }}>Te contactaremos en menos de 24 horas hábiles.</p>
                                    <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setSubmitted(false)}>ENVIAR OTRO</button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                                >
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Nombre Completo</label>
                                        <input
                                            required
                                            type="text"
                                            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff' }}
                                            placeholder="Ej. Juan Pérez"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Email</label>
                                        <input
                                            required
                                            type="email"
                                            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff' }}
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Mensaje</label>
                                        <textarea
                                            required
                                            rows={5}
                                            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: '#fff', resize: 'vertical' }}
                                            placeholder="¿En qué podemos ayudarte?"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>ENVIAR MENSAJE</button>
                                </form>
                            )}
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>mail</span>
                                <span style={{ fontWeight: 600 }}>soporte@advancedhealth.com.co</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>chat</span>
                                <span style={{ fontWeight: 600 }}>WhatsApp: +57 300 000 0000</span>
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

import Link from 'next/link';

export default function Nosotros({ params: { lang } }: { params: { lang: string } }) {
    const values = [
        {
            icon: 'biotech',
            title: 'Ciencia Aplicada',
            desc: 'No creemos en tendencias, creemos en datos. Cada fórmula es el resultado de años de investigación clínica.',
        },
        {
            icon: 'humidity_high',
            title: 'Pureza Absoluta',
            desc: 'Seleccionamos solo ingredientes con la mayor biodisponibilidad, libres de rellenos innecesarios.',
        },
        {
            icon: 'psychology',
            title: 'Rendimiento Humano',
            desc: 'Nuestra misión es potenciar tu biología para que alcances tu máximo potencial físico y mental.',
        },
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
                        Nuestra <span style={{ color: 'var(--primary)' }}>Misión</span>
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
                        Redefiniendo el <br />
                        <span style={{ color: 'var(--outline-variant)' }}>Estándar</span> de <span style={{ color: 'var(--primary)' }}>Vitalidad.</span>
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
                        Nacimos de la necesidad de suplementos que realmente cumplan lo que prometen. Ciencia pura, transparencia total.
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
                            alt="Científicos trabajando en laboratorio"
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
                            Nuestra <span style={{ color: 'var(--primary)' }}>Historia</span>
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
                            <p>
                                Advanced Health comenzó en un pequeño laboratorio con una idea simple: la nutrición debe ser tratada con la misma rigurosidad que la medicina.
                            </p>
                            <p>
                                Hoy, colaboramos con los mejores científicos y nutricionistas del mundo para desarrollar fórmulas que no solo mejoran tu salud, sino que optimizan tu vida.
                            </p>
                            <p>
                                No buscamos ser la marca más grande, sino la más confiable. Por eso, cada lote de nuestros productos es sometido a pruebas de terceros para asegurar su pureza y potencia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ VALUES SECTION ═══ */}
            <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-lowest)' }}>
                <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestros <span style={{ color: 'var(--primary)' }}>Valores</span></h2>
                        <div
                            style={{
                                width: '4rem',
                                height: '4px',
                                background: 'var(--primary)',
                                margin: '0 auto',
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '3rem',
                        }}
                        className="values-grid"
                    >
                        {values.map((val) => (
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
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ color: 'var(--on-primary-container)', fontSize: '2rem' }}
                                    >
                                        {val.icon}
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
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>¿Listo para el siguiente nivel?</h2>
                <Link href={`/${lang}/productos`} className="btn btn-primary">
                    EXPLORAR PRODUCTOS
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

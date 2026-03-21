import Link from 'next/link';
import AnimatedCounter from '@/components/AnimatedCounter';
import NewsletterForm from '@/components/NewsletterForm';

// ─── Data ──────────────────────────────────────────
const bestSellers = [
  {
    id: 1,
    name: 'Péptidos de Colágeno',
    desc: 'Piel, Cabello, Uñas y Articulaciones',
    price: '$45.00',
    badge: 'NUEVO',
    badgeBg: 'var(--primary-container)',
    badgeColor: 'var(--on-primary-container)',
    stars: 5,
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'Complejo B Clínico',
    desc: 'Soporte Energético Avanzado',
    price: '$32.00',
    badge: 'POPULAR',
    badgeBg: 'var(--secondary)',
    badgeColor: '#fff',
    stars: 4,
    img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Probiótico 50B',
    desc: 'Salud Digestiva e Inmune',
    price: '$38.00',
    badge: null,
    stars: 5,
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&fit=crop',
  },
  {
    id: 4,
    name: 'Noche Profunda',
    desc: 'Magnesio y Adaptógenos',
    price: '$29.00',
    badge: null,
    stars: 5,
    img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80&fit=crop',
  },
];

const whyItems = [
  {
    icon: 'science',
    title: 'Calidad Clínica',
    desc: 'Fórmulas desarrolladas por científicos líderes con ingredientes de grado farmacéutico para máxima biodisponibilidad.',
  },
  {
    icon: 'eco',
    title: 'Ingredientes Puros',
    desc: 'Sin rellenos, sin colorantes artificiales. Solo lo que tu cuerpo necesita, en su forma más natural y efectiva.',
  },
  {
    icon: 'verified',
    title: 'Transparencia Total',
    desc: 'Trazabilidad completa de cada lote. Publicamos nuestros análisis de terceros para asegurar tu tranquilidad.',
  },
];

// ─── Component ─────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section
        style={{
          position: 'relative',
          height: '870px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--surface-container-low)',
        }}
      >
        {/* Left content */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 6rem',
          }}
          className="hero-left"
        >
          <div style={{ maxWidth: '36rem' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-label)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                marginBottom: '1.5rem',
              }}
            >
              Clinical Excellence
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: 'var(--on-surface)',
                marginBottom: '2rem',
              }}
            >
              Vitalidad{' '}
              <br />
              <span style={{ color: 'var(--primary)' }}>Celular.</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '28rem',
              }}
            >
              Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/productos" className="btn btn-primary">
                COMPRAR AHORA
              </Link>
              <Link href="/ciencia" className="btn btn-outline">
                NUESTRA CIENCIA
              </Link>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
          }}
          className="hero-right"
        >
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=90&fit=crop"
            alt="Modern fitness lifestyle with supplements"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(15%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 102, 137, 0.08)',
            }}
          />
        </div>

        {/* Floating Product Card */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            right: '3rem',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 24px 64px -8px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 10,
          }}
          className="hero-floating"
        >
          <img
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=160&q=80&fit=crop"
            alt="Bio-Collagen+ product"
            style={{ width: '5rem', height: '5rem', objectFit: 'contain' }}
          />
          <div>
            <p
              style={{
                fontSize: '0.625rem',
                fontFamily: 'var(--font-label)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--outline)',
                marginBottom: '0.25rem',
              }}
            >
              Featured Formula
            </p>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 700,
                color: 'var(--primary)',
                fontSize: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Bio-Collagen+
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>Pure Marine Source</p>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-left { width: 100% !important; padding: 3rem 1.5rem !important; position: relative; z-index: 2; }
            .hero-right { display: none; }
            .hero-floating { display: none; }
          }
        `}</style>
      </section>

      {/* ═══ CATEGORIES BENTO GRID ═══ */}
      <section
        style={{
          padding: '8rem 2rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--on-surface)',
              marginBottom: '0.5rem',
            }}
          >
            Categorías <span style={{ color: 'var(--primary)' }}>Destacadas</span>
          </h2>
          <div
            style={{
              width: '6rem',
              height: '4px',
              background: 'var(--primary)',
              borderRadius: 0,
            }}
          />
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem',
            height: '700px',
          }}
          className="bento-grid"
        >
          {/* Colágeno — wide */}
          <BentoCat
            col="span 8"
            label="Colágeno"
            link="/productos?cat=colageno"
            linkText="Explorar Colección"
            imgUrl="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&fit=crop"
            gradFrom="var(--primary)"
            labelSize="3rem"
          />
          {/* Vitaminas — narrow */}
          <BentoCat
            col="span 4"
            label="Vitaminas"
            link="/productos?cat=vitaminas"
            linkText="Ver todo"
            imgUrl="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80&fit=crop"
            gradFrom="var(--secondary)"
            labelSize="1.75rem"
          />
          {/* Energía — narrow */}
          <BentoCat
            col="span 4"
            label="Energía"
            link="/productos?cat=energia"
            linkText="Rendimiento"
            imgUrl="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop"
            gradFrom="var(--primary)"
            labelSize="1.75rem"
          />
          {/* Bienestar Clínico — wide */}
          <BentoCat
            col="span 8"
            label="Bienestar Clínico"
            link="/productos?cat=bienestar"
            linkText="Ciencia AH"
            imgUrl="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&fit=crop"
            gradFrom="#171c1f"
            labelSize="2.25rem"
          />
        </div>

        <style>{`
          @media (max-width: 768px) {
            .bento-grid { display: flex !important; flex-direction: column !important; height: auto !important; }
            .bento-item { height: 250px !important; }
          }
        `}</style>
      </section>

      {/* ═══ BEST SELLERS ═══ */}
      <section
        style={{
          background: 'var(--surface-container-low)',
          padding: '8rem 2rem',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '4rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--on-surface)',
                }}
              >
                Nuestros <span style={{ color: 'var(--primary)' }}>Best Sellers</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--on-surface-variant)',
                  marginTop: '0.5rem',
                }}
              >
                Fórmulas galardonadas por expertos.
              </p>
            </div>
            <Link
              href="/productos"
              style={{
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                color: 'var(--primary)',
                borderBottom: '2px solid var(--primary-container)',
                paddingBottom: '2px',
                textDecoration: 'none',
              }}
            >
              Ver Todo el Catálogo
            </Link>
          </div>

          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
            }}
            className="product-grid"
          >
            {bestSellers.map((product) => (
              <div key={product.id} className="product-card">
                {/* Image */}
                <div className="product-image">
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-slow)',
                    }}
                    className="product-img-hover"
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: product.badgeBg,
                        color: product.badgeColor,
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flexGrow: 1 }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined"
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--secondary-container)',
                          fontVariationSettings: i < product.stars ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      letterSpacing: '-0.02em',
                      color: 'var(--on-surface)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {product.name}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--on-surface-variant)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {product.desc}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: 'var(--primary)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {product.price}
                  </p>
                </div>

                <button className="add-to-cart">
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                    shopping_bag
                  </span>
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>

          <style>{`
            .product-grid { grid-template-columns: repeat(4, 1fr); }
            @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }
            .product-img-hover { object-fit: cover; }
            .product-card:hover .product-img-hover { transform: scale(1.08); }
          `}</style>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section style={{ padding: '8rem 2rem', background: 'var(--surface-container-lowest)' }}>
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8rem',
            alignItems: 'center',
          }}
          className="why-grid"
        >
          {/* Left image */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                aspectRatio: '4/5',
                background: 'var(--surface-container-high)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=85&fit=crop"
                alt="Laboratory specialist inspecting clinical ingredients"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-2rem',
                background: 'var(--primary)',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--on-primary)',
                maxWidth: '18rem',
                boxShadow: 'var(--shadow-xl)',
              }}
              className="why-badge"
            >
              <p
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                }}
              >
                <span style={{ color: 'var(--outline-variant)' }}>+</span><AnimatedCounter end={2000} duration={2500} /><br />
                Tratamientos Fabricados
              </p>
            </div>
          </div>

          {/* Right content */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-label)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                marginBottom: '1.5rem',
              }}
            >
              Nuestra Diferencia
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(2rem, 4vw, 3.125rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--on-surface)',
                marginBottom: '3rem',
                lineHeight: 1.1,
              }}
            >
              Por qué elegir <span style={{ color: 'var(--primary)' }}>Advanced Health</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {whyItems.map((item) => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div
                    style={{
                      background: 'var(--surface-container)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: 'var(--primary)', fontSize: '1.875rem' }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.02em',
                        color: 'var(--on-surface)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        color: 'var(--on-surface-variant)',
                        lineHeight: 1.7,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .why-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 900px) {
            .why-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
            .why-badge { display: none; }
          }
        `}</style>
      </section>

      {/* ═══ CTA / NEWSLETTER ═══ */}
      <section
        style={{
          padding: '6rem 2rem',
          background: 'var(--primary)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Grid overlay decoration */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 0, transparent calc(100% / 12))',
          }}
        />
        <div
          style={{
            maxWidth: '52rem',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-headline)',
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 3.125rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
            }}
          >
            Únete a la Revolución del Bienestar
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.125rem',
              marginBottom: '3rem',
            }}
          >
            Suscríbete para recibir consejos clínicos de salud y un 15% de descuento en tu primer pedido.
          </p>

          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

// ─── BentoCat Sub-component ─────────────────────────────────────
function BentoCat({
  col,
  label,
  link,
  linkText,
  imgUrl,
  gradFrom,
  labelSize,
}: {
  col: string;
  label: string;
  link: string;
  linkText: string;
  imgUrl: string;
  gradFrom: string;
  labelSize: string;
}) {
  return (
    <div
      style={{
        gridColumn: col,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-container-high)',
        cursor: 'pointer',
      }}
      className="bento-item"
    >
      <img
        src={imgUrl}
        alt={label}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform var(--transition-slow)',
        }}
        className="bento-img"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${gradFrom}99, transparent)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '3rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-headline)',
            fontSize: labelSize,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
          }}
        >
          {label}
        </h3>
        <Link
          href={link}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          {linkText}{' '}
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
            arrow_forward
          </span>
        </Link>
      </div>
      <style>{`.bento-item:hover .bento-img { transform: scale(1.05); }`}</style>
    </div>
  );
}


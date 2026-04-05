import Link from 'next/link';
import AnimatedCounter from '@/components/AnimatedCounter';
import NewsletterForm from '@/components/NewsletterForm';
import ProductCard from '@/components/ProductCard';
import { getDictionary } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.advancedhealth.com.co';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const isEn = lang === 'en';
  const title = isEn
    ? 'Clinical Supplements for Human Performance'
    : 'Suplementos Clínicos Premium Colombia';
  const description = isEn
    ? 'Advanced nutrition designed for human performance. Pure science, proven results. Premium clinical supplements.'
    : 'Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados. Suplementos clínicos premium con registro INVIMA.';

  return {
    title: { absolute: `${title} | Advanced Health` },
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/es`,
      },
    },
    openGraph: {
      title: `${title} | Advanced Health`,
      description,
      url: `${BASE_URL}/${lang}`,
      locale: isEn ? 'en_US' : 'es_CO',
      type: 'website',
      images: [{ url: `${BASE_URL}/logo-advanced-health-COLOR_HORIZONTAL.png`, width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
    },
  };
}



// ─── Component ─────────────────────────────────────
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');

  const { featured } = await getProducts();
  const bestSellersProducts = featured.slice(0, 4);

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
              {dict.home.hero.badge || 'Clinical Excellence'}
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
              {dict.home.hero.title_1}{' '}
              <br />
              <span style={{ color: 'var(--primary)' }}>{dict.home.hero.title_2}</span>
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
              {dict.home.hero.desc}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href={`/${lang}/productos`} className="btn btn-primary">
                {dict.home.hero.cta_primary}
              </Link>
              <Link href={`/${lang}/blog`} className="btn btn-outline">
                {dict.home.hero.cta_secondary}
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
            {dict.home.categories}{' '}
            <span style={{ color: 'var(--primary)' }}>{dict.home.categories_highlight}</span>
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
            label={dict.home.categories_list[0].label}
            link={`/${lang}/productos?cat=colageno`}
            linkText={dict.home.categories_list[0].text}
            imgUrl="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&fit=crop"
            gradFrom="var(--primary)"
            labelSize="3rem"
          />
          {/* Vitaminas — narrow */}
          <BentoCat
            col="span 4"
            label={dict.home.categories_list[1].label}
            link={`/${lang}/productos?cat=vitaminas`}
            linkText={dict.home.categories_list[1].text}
            imgUrl="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80&fit=crop"
            gradFrom="var(--secondary)"
            labelSize="1.75rem"
          />
          {/* Energía — narrow */}
          <BentoCat
            col="span 4"
            label={dict.home.categories_list[2].label}
            link={`/${lang}/productos?cat=energia`}
            linkText={dict.home.categories_list[2].text}
            imgUrl="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop"
            gradFrom="var(--primary)"
            labelSize="1.75rem"
          />
          {/* Bienestar Clínico — wide */}
          <BentoCat
            col="span 8"
            label={dict.home.categories_list[3].label}
            link={`/${lang}/productos?cat=bienestar`}
            linkText={dict.home.categories_list[3].text}
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
                {dict.home.best_sellers}{' '}
                <span style={{ color: 'var(--primary)' }}>{dict.home.best_sellers_highlight}</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--on-surface-variant)',
                  marginTop: '0.5rem',
                }}
              >
                {dict.home.best_sellers_sub}
              </p>
            </div>
            <Link
              href={`/${lang}/productos`}
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
              {dict.home.view_all}
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
            {bestSellersProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                dict={{
                  add_to_cart: dict.productos.modal.add_to_cart,
                  buy: dict.productos.modal.buy,
                  benefits: dict.productos.modal.benefits,
                  how_to_use: dict.productos.modal.how_to_use,
                  presentation: dict.productos.modal.presentation,
                  flavor: dict.productos.modal.flavor,
                  soon: dict.productos.modal.soon,
                  close: dict.productos.modal.close,
                }}
              />
            ))}
          </div>

          <style>{`
            .product-grid { grid-template-columns: repeat(4, 1fr); }
            @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }
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
                <span style={{ color: 'var(--outline-variant)' }}>+</span><AnimatedCounter end={700000} duration={2500} /><br />
                {dict.home.treatments_label}
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
              {dict.home.why_label}
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
              {dict.home.why_title} <span style={{ color: 'var(--primary)' }}>{dict.home.why_highlight}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {dict.home.why_items.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
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
                      {idx === 0 ? 'science' : idx === 1 ? 'eco' : 'verified'}
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
            {dict.home.cta_title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.125rem',
              marginBottom: '3rem',
            }}
          >
            {dict.home.cta_desc}
          </p>

          <NewsletterForm
            buttonText={dict.home.cta_button}
          />
          {dict.home.cta_disclaimer && (
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.75rem',
              marginTop: '1.5rem',
            }}>
              {dict.home.cta_disclaimer}
            </p>
          )}
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


import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';

const productMeta = [
  { id: 1, price: '$89.00', badgeKey: 'best_seller', stars: 4.9, reviews: 124, img: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&q=80&fit=crop' },
  { id: 2, price: '$124.00', badgeKey: null, stars: 5.0, reviews: 89, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80&fit=crop' },
  { id: 3, price: '$56.00', badgeKey: 'new', stars: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&fit=crop' },
  { id: 4, price: '$45.00', badgeKey: null, stars: 4.7, reviews: 56, img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80&fit=crop' },
  { id: 5, price: '$112.00', badgeKey: null, stars: 4.9, reviews: 182, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&fit=crop' },
  { id: 6, price: '$34.00', badgeKey: null, stars: 4.6, reviews: 94, img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80&fit=crop' },
];

export default async function ProductosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.productos;

  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <div
        style={{
          padding: '3rem 2rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-label)',
              fontSize: '0.6875rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              marginBottom: '1rem',
            }}
          >
            {t.badge}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--on-surface)',
            }}
          >
            {t.title} <span style={{ color: 'var(--accent)' }}>{t.title_highlight}</span>
          </h1>
          <p
            style={{
              marginTop: '1.5rem',
              color: 'var(--on-surface-variant)',
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
              maxWidth: '36rem',
            }}
          >
            {t.desc}
          </p>
        </div>

        {/* Respaldo badge */}
        <div
          style={{
            background: 'var(--surface-container)',
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '2rem' }}>
            clinical_notes
          </span>
          <div>
            <p style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--outline)' }}>
              {t.clinical_label}
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)' }}>{t.clinical_value}</p>
          </div>
        </div>
      </div>

      {/* ═══ MAIN ═══ */}
      <div
        style={{
          display: 'flex',
          gap: '4rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '2rem 2rem 8rem',
        }}
        className="catalog-layout"
      >
        {/* Sidebar Filters */}
        <aside style={{ width: '16rem', flexShrink: 0 }} className="catalog-sidebar">
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--outline)', marginBottom: '1.5rem' }}>
              {t.filter_need}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {t.needs.map((need: string) => (
                <label key={need} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" className="filter-checkbox" />
                  <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>{need}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--outline)', marginBottom: '1.5rem' }}>
              {t.filter_category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {t.categories.map((cat: string, i: number) => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="radio" name="cat" defaultChecked={i === 0} className="filter-radio" />
                  <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: i === 0 ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: i === 0 ? 600 : 400 }}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--outline-variant)', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(0, 102, 137, 0.06)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {t.advisory_label}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '1rem' }}>
                {t.advisory_text}
              </p>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--secondary)', textDecoration: 'underline', textUnderlineOffset: '4px', padding: 0 }}>
                {t.advisory_btn}
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem 2.5rem' }} className="products-grid">
            {productMeta.map((pm, idx) => {
              const prod = t.products[idx];
              const badgeText = pm.badgeKey ? (t.badges as Record<string, string>)[pm.badgeKey] : null;
              return (
                <article key={pm.id} className="product-card">
                  <div className="product-image">
                    <img src={pm.img} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="prod-img" />
                    {badgeText && (
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: pm.badgeKey === 'new' ? 'var(--secondary)' : 'var(--surface-container-lowest)', color: pm.badgeKey === 'new' ? '#fff' : 'var(--primary)', fontSize: '0.625rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', letterSpacing: '0.08em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                        {badgeText}
                      </span>
                    )}
                    <button style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--primary)', color: '#ffffff', border: 'none', borderRadius: '9999px', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-lg)', transition: 'all var(--transition-base)' }} className="cart-hover-btn" aria-label={t.add_to_cart}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>add_shopping_cart</span>
                    </button>
                  </div>
                  <div style={{ padding: '0 0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--on-surface)' }}>{prod.name}</h2>
                      <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--secondary)', flexShrink: 0, marginLeft: '0.5rem' }}>{pm.price}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{prod.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--on-surface)' }}>{pm.stars}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--outline)', marginLeft: '0.25rem' }}>({pm.reviews} {t.reviews_suffix})</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ borderRadius: '9999px', boxShadow: 'var(--shadow-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              {t.load_more}
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>keyboard_arrow_down</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .catalog-layout { flex-direction: row; }
        .catalog-sidebar { display: block; }
        .products-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .catalog-layout { flex-direction: column !important; }
          .catalog-sidebar { width: 100% !important; }
          .products-grid { grid-template-columns: 1fr; }
        }
        .cart-hover-btn { opacity: 0; transform: translateY(8px); }
        .product-card:hover .cart-hover-btn { opacity: 1; transform: translateY(0); }
        .product-card:hover .prod-img { transform: scale(1.05); }
      `}</style>
    </>
  );
}

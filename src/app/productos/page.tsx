import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Complex Vitality O3',
    desc: 'Fórmula avanzada con Omega-3 purificado y antioxidantes para la regeneración celular.',
    price: '$89.00',
    badge: 'Más Vendido',
    badgeBg: 'var(--surface-container-lowest)',
    badgeColor: 'var(--primary)',
    stars: 4.9,
    reviews: 124,
    img: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'Dermal Restore Serum',
    desc: 'Sérum de grado clínico con ácido hialurónico de tres pesos moleculares.',
    price: '$124.00',
    badge: null,
    stars: 5.0,
    reviews: 89,
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Immune Defense Pack',
    desc: 'Combinación estratégica de Vitamina D3, K2 y Zinc Quelado.',
    price: '$56.00',
    badge: 'Nuevo',
    badgeBg: 'var(--secondary)',
    badgeColor: '#fff',
    stars: 4.8,
    reviews: 245,
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&fit=crop',
  },
  {
    id: 4,
    name: 'Bone Strength Complex',
    desc: 'Calcio orgánico con magnesio marino para máxima absorción ósea.',
    price: '$45.00',
    badge: null,
    stars: 4.7,
    reviews: 56,
    img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80&fit=crop',
  },
  {
    id: 5,
    name: 'Neuro Focus Elite',
    desc: 'Nootrópico de amplio espectro para claridad mental y reducción de cortisol.',
    price: '$112.00',
    badge: null,
    stars: 4.9,
    reviews: 182,
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&fit=crop',
  },
  {
    id: 6,
    name: 'Cellular Energy B‑12',
    desc: 'Metilcobalamina sublingual de alta potencia para energía sostenida.',
    price: '$34.00',
    badge: null,
    stars: 4.6,
    reviews: 94,
    img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80&fit=crop',
  },
];

const categories = ['Todos los Productos', 'Suplementos', 'Cuidado Tópico', 'Kits de Salud'];
const needs = ['Salud Ósea', 'Piel & Vitalidad', 'Energía Celular', 'Inmunidad'];

export default function ProductosPage() {
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
            Catálogo Editorial
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
            Encuentra tu Bienestar
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
            Descubre nuestra selección curada de suplementos y soluciones clínicas diseñadas para optimizar cada aspecto de tu salud celular.
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
            <p
              style={{
                fontSize: '0.625rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
              }}
            >
              Respaldo
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)' }}>100% Clínico</p>
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
        <aside
          style={{
            width: '16rem',
            flexShrink: 0,
          }}
          className="catalog-sidebar"
        >
          {/* Necesidad */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
                marginBottom: '1.5rem',
              }}
            >
              Necesidad
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {needs.map((need) => (
                <label
                  key={need}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <input type="checkbox" className="filter-checkbox" />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    {need}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categoría */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
                marginBottom: '1.5rem',
              }}
            >
              Categoría
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.map((cat, i) => (
                <label
                  key={cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="cat" defaultChecked={i === 0} className="filter-radio" />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      color: i === 0 ? 'var(--primary)' : 'var(--on-surface-variant)',
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Asesoría callout */}
          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid var(--outline-variant)',
              marginTop: '1rem',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 102, 137, 0.06)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <p
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Asesoría
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--on-surface-variant)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                ¿No sabes qué elegir? Habla con un especialista clínico.
              </p>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--secondary)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  padding: 0,
                }}
              >
                Contactar
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4rem 2.5rem',
            }}
            className="products-grid"
          >
            {products.map((product) => (
              <article key={product.id} className="product-card">
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
                    className="prod-img"
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: product.badgeBg,
                        color: product.badgeColor,
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Add to cart hover button */}
                  <button
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '9999px',
                      width: '3rem',
                      height: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-lg)',
                      transition: 'all var(--transition-base)',
                    }}
                    className="cart-hover-btn"
                    aria-label="Añadir al carrito"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                      add_shopping_cart
                    </span>
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: '0 0 1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: 'var(--on-surface)',
                      }}
                    >
                      {product.name}
                    </h2>
                    <span
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        color: 'var(--secondary)',
                        flexShrink: 0,
                        marginLeft: '0.5rem',
                      }}
                    >
                      {product.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--on-surface-variant)',
                      lineHeight: 1.6,
                      marginBottom: '0.75rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.desc}
                  </p>

                  {/* Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--primary)',
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--on-surface)',
                      }}
                    >
                      {product.stars}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--outline)',
                        marginLeft: '0.25rem',
                      }}
                    >
                      ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ borderRadius: '9999px', boxShadow: 'var(--shadow-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
            >
              Cargar más productos
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                keyboard_arrow_down
              </span>
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

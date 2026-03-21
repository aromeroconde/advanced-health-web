import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'Ciencia',
    title: 'El Colágeno en la Regeneración Celular: Más Allá de la Piel',
    excerpt:
      'Nueva evidencia clínica respalda el uso de péptidos de colágeno tipo I y III para la restauración del tejido conectivo. Un análisis profundo de los mecanismos biológicos.',
    date: '14 Jun 2024',
    readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80&fit=crop',
    featured: true,
  },
  {
    id: 2,
    category: 'Rendimiento',
    title: 'Magnesio y el Sueño Profundo: La Conexión Molecular',
    excerpt:
      'Exploramos cómo las diferentes formas de magnesio afectan la arquitectura del sueño y la recuperación neuro-muscular.',
    date: '8 Jun 2024',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80&fit=crop',
    featured: false,
  },
  {
    id: 3,
    category: 'Inmunidad',
    title: 'Vitamina D3 + K2: El Protocolo de Invierno Definitivo',
    excerpt:
      'Por qué suplementar con D3 sola es insuficiente y cómo la K2 complementa su función en el metabolismo óseo y cardiovascular.',
    date: '1 Jun 2024',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80&fit=crop',
    featured: false,
  },
  {
    id: 4,
    category: 'Salud Mental',
    title: 'Adaptógenos y el Eje Hipotálamo-Hipófiso-Suprarrenal',
    excerpt:
      'Ashwagandha, Rhodiola y Reishi: mecanismos de acción sobre el eje del estrés respaldados por ensayos clínicos.',
    date: '24 May 2024',
    readTime: '10 min',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&fit=crop',
    featured: false,
  },
  {
    id: 5,
    category: 'Nutrición',
    title: 'Microbioma Intestinal: La Nueva Frontera del Bienestar Sistémico',
    excerpt:
      'Reprogramar la flora intestinal con probióticos clínicos de tercera generación. Implicaciones para la salud inmune, mental y metabólica.',
    date: '17 May 2024',
    readTime: '9 min',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&fit=crop',
    featured: false,
  },
];

const tags = ['Todos', 'Ciencia', 'Rendimiento', 'Inmunidad', 'Nutrición', 'Salud Mental'];

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <div
        style={{
          padding: '4rem 2rem 3rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
      >
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
          Ciencia & Bienestar
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
          El Blog de <span style={{ color: 'var(--accent)' }}>Advanced Health Company</span>
        </h1>
      </div>

      {/* ═══ TAG FILTER ═══ */}
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 2rem 4rem',
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
        }}
      >
        {tags.map((tag, i) => (
          <button
            key={tag}
            style={{
              background: i === 0 ? 'var(--primary)' : 'var(--surface-container)',
              color: i === 0 ? '#ffffff' : 'var(--on-surface-variant)',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 2rem 8rem',
        }}
      >
        {/* ═══ FEATURED ARTICLE ═══ */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            marginBottom: '6rem',
            border: '1px solid var(--outline-variant)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
          className="featured-article"
        >
          {/* Image */}
          <div style={{ position: 'relative', minHeight: '480px', overflow: 'hidden' }}>
            <img
              src={featured.img}
              alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                background: 'var(--primary)',
                color: '#ffffff',
                fontSize: '0.625rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Destacado
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: '4rem',
              background: 'var(--surface-container-low)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                marginBottom: '1rem',
              }}
            >
              {featured.category}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--on-surface)',
                marginBottom: '1.5rem',
              }}
            >
              {featured.title}
            </h2>
            <p
              style={{
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              {featured.excerpt}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--outline)',
                }}
              >
                {featured.date} · {featured.readTime} lectura
              </p>
              <Link
                href={`/blog/${featured.id}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Leer más{' '}
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </article>

        {/* ═══ ARTICLE GRID ═══ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
          }}
          className="blog-grid"
        >
          {rest.map((article) => (
            <article
              key={article.id}
              style={{
                borderBottom: '1px solid var(--outline-variant)',
                paddingBottom: '3rem',
              }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                }}
              >
                <img
                  src={article.img}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)',
                  }}
                  className="blog-img"
                />
              </div>

              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  marginBottom: '0.75rem',
                }}
              >
                {article.category}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: 'var(--on-surface)',
                  marginBottom: '0.75rem',
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--on-surface-variant)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {article.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>
                  {article.date} · {article.readTime}
                </p>
                <Link
                  href={`/blog/${article.id}`}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  Leer{' '}
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                    arrow_forward
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .featured-article { grid-template-columns: 1fr 1fr; }
        .blog-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 900px) {
          .featured-article { grid-template-columns: 1fr !important; }
          .featured-article > div:first-child { min-height: 280px !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        article:hover .blog-img { transform: scale(1.08); }
      `}</style>
    </>
  );
}

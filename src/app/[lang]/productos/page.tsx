import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';
import CarouselArrows from '@/components/CarouselArrows';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.advancedhealth.com.co';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  const title = isEn
    ? 'Clinical Supplements Catalog'
    : 'Suplementos Clínicos Premium';
  const description = isEn
    ? 'Discover our curated selection of clinical-grade supplements. Collagen, vitamins, adaptogens, and more with INVIMA registration.'
    : 'Descubre nuestra selección curada de suplementos de grado clínico. Colágeno, vitaminas, adaptógenos y más con registro INVIMA vigente.';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/productos`,
      languages: {
        es: `${BASE_URL}/es/productos`,
        en: `${BASE_URL}/en/productos`,
        'x-default': `${BASE_URL}/es/productos`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/productos`,
      locale: isEn ? 'en_US' : 'es_CO',
      type: 'website',
      images: [{ url: `${BASE_URL}/logo-advanced-health-COLOR_HORIZONTAL.png`, width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
    },
  };
}

const PLACEHOLDER_IMG = '/images/product-placeholder.svg';
const PAGE_SIZE = 12;

// Category icons
const CATEGORY_ICONS: Record<string, string> = {
  'Todos los Productos': 'apps',
  'Suplementos': 'pill',
  'Bebidas Funcional': 'local_cafe',
  'Colágeno': 'water_drop',
  'Snacks': 'cookie',
  'Cuidado Tópico': 'spa',
  'Kits de Salud': 'medical_services',
  'Gudd': 'eco',
  'gudd': 'eco',
};

export default async function ProductosPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ categoria?: string; marca?: string; page?: string }> }) {
  const { lang } = await params;
  const filters = await searchParams;
  const dict = await getDictionary(lang as 'es' | 'en');
  const t = dict.productos;
  const isEn = lang === 'en';
  const modalDict = t.modal;
  const cartDict = t.cart;

  const { featured, products, categories } = await getProducts();

  // Apply filters from URL search params
  let filtered = products;
  if (filters.categoria && filters.categoria !== 'Todos los Productos' && filters.categoria !== 'All Products') {
    filtered = filtered.filter(p => p.category === filters.categoria);
  }
  if (filters.marca) {
    filtered = filtered.filter(p => p.marca === filters.marca);
  }

  // Pagination
  const currentPage = Math.max(1, parseInt(filters.page || '1', 10) || 1);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function pageUrl(page: number) {
    const params = new URLSearchParams();
    if (filters.categoria) params.set('categoria', filters.categoria);
    if (filters.marca) params.set('marca', filters.marca);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return `/${lang}/productos${qs ? `?${qs}` : ''}`;
  }

  const activeCategory = filters.categoria || 'Todos los Productos';
  const activeMarca = filters.marca || '';
  const marcas = ['FuXion', 'gudd'];

  return (
    <>
      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: isEn ? 'Clinical Supplements - Advanced Health' : 'Suplementos Clínicos - Advanced Health',
            description: isEn
              ? 'Curated selection of clinical-grade supplements.'
              : 'Selección curada de suplementos de grado clínico.',
            numberOfItems: filtered.length,
            itemListElement: filtered.slice(0, 20).map((product, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Product',
                name: product.name,
                description: product.description,
                image: product.imagenUrl ? product.imagenUrl : `${BASE_URL}${PLACEHOLDER_IMG}`,
                brand: { '@type': 'Brand', name: product.brand },
                offers: {
                  '@type': 'Offer',
                  url: `${BASE_URL}/${lang}/productos`,
                  priceCurrency: 'COP',
                  price: String(product.price),
                  availability: 'https://schema.org/InStock',
                  seller: { '@id': `${BASE_URL}/#organization` },
                },
              },
            })),
          }),
        }}
      />

      {/* ═══ HERO SECTION ═══ */}
      <section className="products-hero">
        <div className="products-hero-inner">
          <span className="products-hero-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>science</span>
            {t.badge}
          </span>
          <h1 className="products-hero-title">
            {t.title} <span className="products-hero-highlight">{t.title_highlight}</span>
          </h1>
          <p className="products-hero-desc">{t.desc}</p>
          <div className="products-hero-stats">
            <div className="products-hero-stat">
              <span className="material-symbols-outlined stat-icon">inventory_2</span>
              <div>
                <span className="stat-number">{products.length}+</span>
                <span className="stat-label">{isEn ? 'Products' : 'Productos'}</span>
              </div>
            </div>
            <div className="products-hero-stat">
              <span className="material-symbols-outlined stat-icon">verified</span>
              <div>
                <span className="stat-number">INVIMA</span>
                <span className="stat-label">{isEn ? 'Registered' : 'Registrados'}</span>
              </div>
            </div>
            <div className="products-hero-stat">
              <span className="material-symbols-outlined stat-icon">category</span>
              <div>
                <span className="stat-number">{categories.length - 1}</span>
                <span className="stat-label">{isEn ? 'Categories' : 'Categorías'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="products-hero-glow" />
      </section>

      {/* ═══ FEATURED PRODUCTS CAROUSEL ═══ */}
      {featured.length > 0 && (
        <section className="featured-section">
          <div className="featured-header">
            <div className="featured-header-left">
              <span className="material-symbols-outlined featured-star-icon">star</span>
              <h2 className="featured-title">
                {isEn ? 'Featured Products' : 'Productos Destacados'}
              </h2>
            </div>
            <p className="featured-subtitle">
              {isEn ? 'Our most popular formulas, chosen by experts' : 'Nuestras fórmulas más populares, elegidas por expertos'}
            </p>
          </div>
          <CarouselArrows lang={lang}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} dict={modalDict} className="featured-carousel-item" />
            ))}
          </CarouselArrows>
        </section>
      )}

      {/* ═══ FILTER BAR ═══ */}
      <section className="filter-section">
        <div className="filter-bar">
          {/* Brand filter - always visible */}
          <div className="filter-row">
            <span className="filter-row-label">{isEn ? 'Brand' : 'Marca'}:</span>
            <Link
              href={activeCategory !== 'Todos los Productos' ? `/${lang}/productos?categoria=${encodeURIComponent(activeCategory)}` : `/${lang}/productos`}
              className={`filter-pill ${!activeMarca ? 'filter-pill-active' : ''}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>apps</span>
              {isEn ? 'All' : 'Todas'}
            </Link>
            {marcas.map(marca => {
              const href = activeCategory !== 'Todos los Productos'
                ? `/${lang}/productos?marca=${encodeURIComponent(marca)}&categoria=${encodeURIComponent(activeCategory)}`
                : `/${lang}/productos?marca=${encodeURIComponent(marca)}`;
              return (
                <Link
                  key={marca}
                  href={href}
                  className={`filter-pill ${activeMarca === marca ? 'filter-pill-active' : ''}`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{marca === 'FuXion' ? 'science' : 'eco'}</span>
                  {marca === 'FuXion' ? 'FuXion' : 'gudd'}
                </Link>
              );
            })}
          </div>
          {/* Category filter */}
          <div className="filter-row">
            <span className="filter-row-label">{isEn ? 'Category' : 'Categoría'}:</span>
            {categories.map((cat: string) => {
              const isActive = activeCategory === cat;
              const icon = CATEGORY_ICONS[cat] || 'label';
              const href = cat === 'Todos los Productos'
                ? (activeMarca ? `/${lang}/productos?marca=${encodeURIComponent(activeMarca)}` : `/${lang}/productos`)
                : `/${lang}/productos?categoria=${encodeURIComponent(cat)}${activeMarca ? `&marca=${encodeURIComponent(activeMarca)}` : ''}`;
              return (
                <Link
                  key={cat}
                  href={href}
                  className={`filter-pill ${isActive ? 'filter-pill-active' : ''}`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{icon}</span>
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══ */}
      <section className="catalog-section">
        <div className="catalog-header">
          <p className="catalog-count">
            {isEn
              ? `Showing ${paginated.length} of ${filtered.length} products`
              : `Mostrando ${paginated.length} de ${filtered.length} productos`}
          </p>
          {(filters.categoria || filters.marca) && (
            <Link href={`/${lang}/productos`} className="catalog-clear-filter">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>filter_alt_off</span>
              {isEn ? 'Clear filters' : 'Limpiar filtros'}
            </Link>
          )}
        </div>

        <div className="products-grid">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} dict={modalDict} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-icon">search_off</span>
            <p className="empty-text">
              {isEn ? 'No products found with the selected filters.' : 'No se encontraron productos con los filtros seleccionados.'}
            </p>
            <Link href={`/${lang}/productos`} className="empty-link">
              {isEn ? 'Clear filters' : 'Limpiar filtros'}
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="pagination" aria-label={isEn ? 'Pagination' : 'Paginación'}>
            {currentPage > 1 && (
              <Link href={pageUrl(currentPage - 1)} className="pagination-btn" aria-label={isEn ? 'Previous page' : 'Página anterior'}>
                <span className="material-symbols-outlined">chevron_left</span>
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Link
                key={page}
                href={pageUrl(page)}
                className={`pagination-num ${page === currentPage ? 'pagination-num-active' : ''}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={pageUrl(currentPage + 1)} className="pagination-btn" aria-label={isEn ? 'Next page' : 'Página siguiente'}>
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            )}
          </nav>
        )}
      </section>

      {/* ═══ ADVISORY CTA ═══ */}
      <section className="advisory-section">
        <div className="advisory-card">
          <div className="advisory-icon-wrap">
            <span className="material-symbols-outlined advisory-icon">support_agent</span>
          </div>
          <div className="advisory-content">
            <h3 className="advisory-label">{t.advisory_label}</h3>
            <p className="advisory-text">{t.advisory_text}</p>
          </div>
          <button className="advisory-btn">
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chat</span>
            {t.advisory_btn}
          </button>
        </div>
      </section>

      <style>{`
        /* ═══ HERO ═══ */
        .products-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%);
          padding: 5rem 2rem 4rem;
        }
        .products-hero-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .products-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          margin-bottom: 1.5rem;
          font-family: var(--font-label);
        }
        .products-hero-title {
          font-family: var(--font-headline);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .products-hero-highlight {
          color: #F97316;
        }
        .products-hero-desc {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          max-width: 36rem;
          margin-bottom: 2.5rem;
        }
        .products-hero-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .products-hero-stat {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 0.875rem 1.25rem;
          border-radius: var(--radius-lg);
        }
        .stat-icon {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.9);
        }
        .stat-number {
          display: block;
          font-family: var(--font-headline);
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
        }
        .stat-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .products-hero-glow {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 60%;
          height: 200%;
          background: radial-gradient(ellipse, rgba(249,115,22,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ═══ FEATURED CAROUSEL ═══ */
        .featured-section {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 4rem 3.5rem 2rem;
        }
        .featured-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .featured-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .featured-star-icon {
          font-size: 1.25rem;
          color: #F97316;
        }
        .featured-title {
          font-family: var(--font-headline);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--on-surface);
        }
        .featured-subtitle {
          font-size: 0.9375rem;
          color: var(--on-surface-variant);
          font-family: var(--font-body);
          padding-left: 2rem;
        }
        .featured-carousel-track {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: var(--outline-variant) transparent;
        }
        .featured-carousel-track::-webkit-scrollbar {
          height: 6px;
        }
        .featured-carousel-track::-webkit-scrollbar-track {
          background: transparent;
        }
        .featured-carousel-track::-webkit-scrollbar-thumb {
          background: var(--outline-variant);
          border-radius: 9999px;
        }
        .featured-carousel-item {
          flex: 0 0 calc(25% - 1.5rem);
          scroll-snap-align: start;
        }

        /* ═══ SHARED BADGE & TAG ═══ */
        .product-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          z-index: 2;
        }
        .brand-tag {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          color: var(--primary);
          font-size: 0.5625rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          letter-spacing: 0.04em;
          z-index: 2;
        }

        /* ═══ FILTER BAR ═══ */
        .filter-section {
          position: sticky;
          top: 4rem;
          z-index: 30;
          background: var(--background);
          border-bottom: 1px solid var(--outline-variant);
          padding: 0;
        }
        .filter-bar {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-row-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--outline);
          font-family: var(--font-label);
          white-space: nowrap;
          margin-right: 0.25rem;
        }
        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 500;
          font-family: var(--font-body);
          text-decoration: none;
          color: var(--on-surface-variant);
          background: var(--surface-container);
          border: 1px solid transparent;
          transition: all 200ms;
          cursor: pointer;
          white-space: nowrap;
        }
        .filter-pill:hover {
          background: var(--surface-container-high);
          color: var(--on-surface);
          border-color: var(--outline-variant);
        }
        .filter-pill-active {
          background: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
          font-weight: 600;
        }
        .filter-pill-active:hover {
          opacity: 0.9;
        }

        /* ═══ CATALOG GRID ═══ */
        .catalog-section {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
        }
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .catalog-count {
          font-size: 0.8125rem;
          color: var(--outline);
          font-family: var(--font-body);
        }
        .catalog-clear-filter {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          transition: background 200ms;
        }
        .catalog-clear-filter:hover {
          background: rgba(5, 150, 105, 0.08);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .product-card {
          background: var(--surface-container-lowest);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--outline-variant);
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-3px);
          border-color: var(--primary);
        }
        .product-card-img {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--surface-container);
        }
        .product-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover .product-card-img img {
          transform: scale(1.08);
        }
        .add-cart-btn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: var(--primary);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(8px);
          z-index: 3;
        }
        .product-card:hover .add-cart-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .add-cart-btn:hover {
          background: #047852;
          transform: scale(1.08) !important;
        }
        .product-card-body {
          padding: 1.25rem;
        }
        .product-card-pres {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--outline);
          background: var(--surface-container);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .product-card-name {
          font-family: var(--font-headline);
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: var(--on-surface);
          margin-bottom: 0.375rem;
        }
        .product-card-desc {
          font-size: 0.8125rem;
          color: var(--on-surface-variant);
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--outline-variant);
        }
        .product-card-price {
          font-family: var(--font-headline);
          font-weight: 700;
          font-size: 1.25rem;
          color: #059669;
        }
        .product-card-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--outline);
        }

        /* ═══ EMPTY STATE ═══ */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
        }
        .empty-icon {
          font-size: 3.5rem;
          color: var(--outline);
          display: block;
          margin-bottom: 1.25rem;
        }
        .empty-text {
          font-size: 1.0625rem;
          color: var(--on-surface-variant);
          font-family: var(--font-body);
          margin-bottom: 1.25rem;
        }
        .empty-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          padding: 0.625rem 1.5rem;
          border-radius: 9999px;
          border: 2px solid var(--primary);
          transition: all 200ms;
        }
        .empty-link:hover {
          background: var(--primary);
          color: #ffffff;
        }

        /* ═══ PAGINATION ═══ */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 3rem;
          padding-bottom: 2rem;
        }
        .pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--outline-variant);
          text-decoration: none;
          color: var(--on-surface-variant);
          transition: all 200ms;
        }
        .pagination-btn:hover {
          background: var(--surface-container);
          border-color: var(--primary);
          color: var(--primary);
        }
        .pagination-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--outline-variant);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: var(--font-body);
          color: var(--on-surface-variant);
          transition: all 200ms;
        }
        .pagination-num:hover {
          background: var(--surface-container);
          border-color: var(--primary);
          color: var(--primary);
        }
        .pagination-num-active {
          background: var(--primary) !important;
          border-color: var(--primary) !important;
          color: #ffffff !important;
          font-weight: 700 !important;
        }

        /* ═══ ADVISORY CTA ═══ */
        .advisory-section {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 2rem 5rem;
        }
        .advisory-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.06) 0%, rgba(249, 115, 22, 0.04) 100%);
          border: 1px solid rgba(5, 150, 105, 0.15);
          border-radius: var(--radius-lg);
          padding: 2rem 2.5rem;
        }
        .advisory-icon-wrap {
          flex-shrink: 0;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .advisory-icon {
          font-size: 1.75rem;
          color: #ffffff;
        }
        .advisory-content {
          flex: 1;
        }
        .advisory-label {
          font-family: var(--font-headline);
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 0.375rem;
        }
        .advisory-text {
          font-size: 0.9375rem;
          color: var(--on-surface-variant);
          line-height: 1.6;
          font-family: var(--font-body);
        }
        .advisory-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          padding: 0.875rem 1.75rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 200ms;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
        }
        .advisory-btn:hover {
          background: #047852;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(5, 150, 105, 0.35);
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .featured-carousel-item { flex: 0 0 calc(50% - 1rem); }
          .featured-section { padding: 4rem 3rem 2rem; }
        }
        @media (max-width: 768px) {
          .products-hero { padding: 3.5rem 1.5rem 3rem; }
          .products-hero-stats { gap: 1rem; }
          .products-hero-stat { padding: 0.75rem 1rem; }
          .products-grid { grid-template-columns: 1fr; }
          .featured-carousel-item { flex: 0 0 80%; }
          .featured-section { padding: 3rem 1.5rem 1.5rem; }
          .filter-bar { padding: 1rem 1.5rem; gap: 0.75rem; }
          .filter-row { gap: 0.375rem; }
          .catalog-section { padding: 1.5rem 1.5rem 3rem; }
          .advisory-card {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
            padding: 2rem 1.5rem;
          }
          .filter-section { position: relative; top: 0; }
        }
        @media (max-width: 480px) {
          .filter-categories { gap: 0.375rem; }
          .filter-pill { padding: 0.4rem 0.75rem; font-size: 0.75rem; }
        }

        /* ═══ REDUCED MOTION ═══ */
        @media (prefers-reduced-motion: reduce) {
          .product-card, .product-card-img img,
          .add-cart-btn, .filter-pill, .pagination-num, .advisory-btn {
            transition: none !important;
          }
          .product-card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}

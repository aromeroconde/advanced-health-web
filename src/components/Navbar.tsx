'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

export default function Navbar({ lang, dict, cartDict: externalCartDict }: {
  lang: string,
  dict: Record<string, string>,
  cartDict?: Record<string, string>
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { itemCount } = useCart();
  const activeQ = searchParams.get('q') || '';

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/${lang}/productos?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
    }
  }

  // Eliminar el locale del pathname para chequear rutas activas
  const pathWithoutLang = pathname.replace(`/${lang}`, '') || '/';

  const navLinks = [
    { href: `/${lang}/productos`, match: '/productos', label: dict.tienda },
    { href: `/${lang}/blog`, match: '/blog', label: dict.ciencia },
    { href: `/${lang}/nosotros`, match: '/nosotros', label: dict.acerca_de },
    { href: `/${lang}/soporte`, match: '/soporte', label: dict.soporte },
  ];

  const cartDict = {
    title: externalCartDict?.title || dict.cart_title || 'Tu carrito',
    empty: externalCartDict?.empty || dict.cart_empty || 'Tu carrito está vacío',
    subtotal: externalCartDict?.subtotal || dict.cart_subtotal || 'Subtotal',
    shipping: externalCartDict?.shipping || dict.cart_shipping || 'Envío',
    discount: externalCartDict?.discount || dict.cart_discount || 'Descuento',
    total: externalCartDict?.total || dict.cart_total || 'Total',
    clear: externalCartDict?.clear || dict.cart_clear || 'Vaciar carrito',
    checkout: externalCartDict?.checkout || dict.cart_checkout || 'Finalizar compra por WhatsApp',
    remove: externalCartDict?.remove || dict.cart_remove || 'Eliminar',
    shipping_progress: externalCartDict?.shipping_progress || 'Te faltan {amount} para el envío gratis',
    shipping_congrats: externalCartDict?.shipping_congrats || '¡Felicidades! Tienes envío gratis',
  };

  return (
    <header className="navbar-glass">
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
      >
        {/* Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <Link
            href={`/${lang}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logo-advanced-health-COLOR_HORIZONTAL.png"
              alt="Advanced Health"
              style={{ height: '120px', width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathWithoutLang.startsWith(link.match) || (pathWithoutLang === '/' && link.match === '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--primary)' : 'var(--outline)',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid var(--primary)' : 'none',
                    paddingBottom: isActive ? '2px' : '0',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Search pill - desktop */}
          <form className="search-pill desktop-search" onSubmit={handleSearch}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--outline)' }}>
              search
            </span>
            {activeQ ? (
              <>
                <span className="search-active-text">{activeQ}</span>
                <Link href={pathname} className="search-clear-btn" onClick={() => setSearchQuery('')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>close</span>
                </Link>
              </>
            ) : (
              <input
                type="text"
                placeholder={dict.buscar || "Buscar productos..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </form>

          {/* Language Switcher */}
          <Link
            href={pathname.replace(`/${lang}`, `/${lang === 'en' ? 'es' : 'en'}`)}
            style={{
              fontSize: '0.875rem',
              fontFamily: 'var(--font-headline)',
              fontWeight: 700,
              color: 'var(--primary)',
              textDecoration: 'none',
              border: '1px solid var(--primary)',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
            }}
            className="desktop-nav"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </Link>


          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Ver carrito"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>
              shopping_cart
            </span>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-8px',
                background: '#F97316',
                color: '#fff',
                fontSize: '0.625rem',
                fontWeight: 700,
                width: '1.125rem',
                height: '1.125rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            aria-label="Menú"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface)', fontSize: '1.5rem' }}>
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 2rem',
            borderTop: '1px solid var(--outline-variant)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 600,
                  color: 'var(--on-surface)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--surface-container-high)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          lang={lang}
          dict={cartDict}
          onClose={() => setCartOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

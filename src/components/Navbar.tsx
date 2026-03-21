'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/productos', label: 'Tienda' },
  { href: '/blog', label: 'Ciencia' },
  { href: '/nosotros', label: 'Acerca de' },
  { href: '/soporte', label: 'Soporte' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
            href="/"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logo-advanced-health-COLOR_HORIZONTAL.png"
              alt="Advanced Health"
              style={{ height: '32px', width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
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
          <div className="search-pill desktop-search">
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--outline)' }}>
              search
            </span>
            <input type="text" placeholder="Buscar productos..." />
          </div>

          {/* Mi Cuenta */}
          <Link
            href="/cuenta"
            style={{
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--outline)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
            }}
            className="desktop-nav"
          >
            Mi Cuenta
          </Link>

          {/* Cart */}
          <button
            aria-label="Ver carrito"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>
              shopping_cart
            </span>
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

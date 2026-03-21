import Link from 'next/link';

const footerCols = [
  {
    title: 'Colecciones',
    links: [
      { href: '/productos?cat=colageno', label: 'Todo el Colágeno' },
      { href: '/productos?cat=vitaminas', label: 'Vitaminas y Minerales' },
      { href: '/productos?cat=energia', label: 'Rendimiento Físico' },
      { href: '/productos?cat=mental', label: 'Salud Mental' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { href: '/nosotros', label: 'Nuestra Historia' },
      { href: '/ciencia', label: 'Ciencia y Calidad' },
      { href: '/carreras', label: 'Carreras' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Información',
    links: [
      { href: '/privacidad', label: 'Privacidad' },
      { href: '/terminos', label: 'Términos' },
      { href: '/envios', label: 'Envíos y Devoluciones' },
      { href: '/faq', label: 'Preguntas Frecuentes' },
    ],
  },
];

const socialLinks = [
  { icon: 'public', href: '#', label: 'Web' },
  { icon: 'thumb_up', href: '#', label: 'Facebook' },
  { icon: 'video_library', href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem',
          padding: '4rem 3rem',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
        className="footer-grid"
      >
        {/* Brand Column */}
        <div className="footer-brand">
          <img
            src="/logo-advanced-health-NEGRO_HORIZONTAL.png"
            alt="Advanced Health"
            style={{ height: '50px', width: 'auto', marginBottom: '1.5rem' }}
          />
          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              color: '#64748b',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Líderes mundiales en nutrición clínica y soluciones de bienestar de alto impacto.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map((s) => (
              <Link
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                style={{
                  color: 'var(--primary)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                  {s.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                marginBottom: '2rem',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      color: '#64748b',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          padding: '1.5rem 3rem',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
            color: '#94a3b8',
          }}
        >
          © 2024 Advanced Health. Clinical Excellence &amp; Editorial Vitality.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

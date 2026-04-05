'use client';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/NeoflexPlus',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/neoflexplus',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
];

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
  const t = dict;

  const footerCols = [
    {
      title: t?.col_collections || 'Colecciones',
      links: [
        { href: '/productos?cat=colageno', label: t?.collections?.collagen || 'Todo el Colágeno' },
        { href: '/productos?cat=vitaminas', label: t?.collections?.vitamins || 'Vitaminas y Minerales' },
        { href: '/productos?cat=energia', label: t?.collections?.energy || 'Rendimiento Físico' },
        { href: '/productos?cat=mental', label: t?.collections?.mental || 'Salud Mental' },
      ],
    },
    {
      title: t?.col_company || 'Compañía',
      links: [
        { href: '/nosotros', label: t?.company?.history || 'Nuestra Historia' },
        { href: '/blog', label: 'Blog' },
        { href: '/soporte', label: t?.company?.contact || 'Contacto' },
      ],
    },
    {
      title: t?.col_legal || 'Legal',
      links: [
        { href: '/politicas-de-privacidad', label: t?.legal?.privacy || 'Privacidad' },
        { href: '/derecho-de-retracto', label: t?.legal?.retract || 'Retracto' },
        { href: '/terminos', label: t?.legal?.terms || 'Términos' },
      ],
    },
  ];

  const sicText = t?.sic || "";
  const [beforeInfo, rest] = sicText.split('{link_info}');
  const [between, afterComplaints] = rest ? rest.split('{link_complaint}') : ["", ""];

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
          gap: '2rem',
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
            style={{ height: '60px', width: 'auto', marginBottom: '1.5rem', display: 'block' }}
          />
          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              color: '#64748b',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              maxWidth: '300px'
            }}
          >
            {t?.brand_desc || "Líderes mundiales en nutrición clínica y soluciones de bienestar de alto impacto."}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
              WhatsApp & Phone:
            </p>
            <a
              href={`https://wa.me/576019178558?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20por%20favor`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}
            >
              {t?.contact_phone || "(+57) 601 917 8558"}
            </a>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                style={{
                  color: 'var(--primary)',
                  transition: 'color var(--transition-fast), transform var(--transition-fast)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {s.svg}
              </a>
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
                marginBottom: '1.5rem',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${lang}${link.href}`}
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      color: '#64748b',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    className="footer-link-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SIC and Disclaimer Bar */}
      <div
        style={{
          padding: '2rem 3rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f1f5f9'
        }}
      >
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {beforeInfo}
            <a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>{t?.sic_click}</a>
            {between}
            <a href="https://sedeelectronica.sic.gov.co/atencion-y-servicios-a-la-ciudadania/peticiones-quejas-reclamos-y-denuncias" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>{t?.sic_click}</a>
            {afterComplaints}
          </p>

          <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            {t?.disclaimer}
          </p>
        </div>
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
          {t?.copyright || "© 2024 Advanced Health. Clinical Excellence & Editorial Vitality."}
        </p>
      </div>

      <style jsx>{`
        .footer-link-hover:hover {
          color: var(--primary) !important;
        }
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

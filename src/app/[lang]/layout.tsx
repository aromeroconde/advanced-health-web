import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { getDictionary } from '@/lib/dictionaries';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: {
    default: 'Advanced Health | Suplementos Clínicos Premium Colombia',
    template: '%s | Advanced Health',
  },
  description: 'Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados. Suplementos clínicos premium con registro INVIMA.',
  keywords: ['suplementos clínicos', 'salud', 'colágeno', 'vitaminas', 'bienestar', 'premium', 'INVIMA', 'Colombia'],
  metadataBase: new URL('https://www.advancedhealth.com.co'),
  alternates: {
    canonical: '/es',
    languages: {
      'es': '/es',
      'en': '/en',
      'x-default': '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    url: 'https://www.advancedhealth.com.co',
    siteName: 'Advanced Health',
    title: 'Advanced Health | Suplementos Clínicos Premium Colombia',
    description: 'Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados.',
    images: [{ url: 'https://www.advancedhealth.com.co/logo-advanced-health-COLOR_HORIZONTAL.png', width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.advancedhealth.com.co/#organization',
  name: 'Advanced Health Company SAS',
  alternateName: 'Advanced Health',
  url: 'https://www.advancedhealth.com.co',
  logo: 'https://www.advancedhealth.com.co/logo-advanced-health-COLOR_HORIZONTAL.png',
  description: 'E-commerce de suplementos clínicos premium. Nutrición avanzada diseñada para el rendimiento humano. Ciencia pura, resultados probados.',
  email: 'contacto@advancedhealth.com.co',
  telephone: '+576019178558',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressLocality: 'Bogotá',
  },
  sameAs: [
    'https://facebook.com/NeoflexPlus',
    'https://instagram.com/neoflexplus',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+576019178558',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
    areaServed: 'CO',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.advancedhealth.com.co/#website',
  name: 'Advanced Health',
  url: 'https://www.advancedhealth.com.co',
  inLanguage: ['es', 'en'],
  publisher: { '@id': 'https://www.advancedhealth.com.co/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.advancedhealth.com.co/es/productos?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'es' | 'en');

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar lang={lang} dict={dict.navbar} cartDict={dict.productos.cart} />
          <main id="main-content">{children}</main>
          <Footer lang={lang} dict={dict.footer} />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}

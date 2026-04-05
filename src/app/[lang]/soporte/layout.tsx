import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';

const BASE_URL = 'https://www.advancedhealth.com.co';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';
    const title = isEn
        ? 'Support & FAQ'
        : 'Soporte y Preguntas Frecuentes';
    const description = isEn
        ? 'Get help with your order, track shipments, learn about our return policy, and find answers to frequently asked questions about our clinical supplements.'
        : 'Obtén ayuda con tu pedido, rastrea envíos, conoce nuestra política de devoluciones y encuentra respuestas a preguntas frecuentes sobre nuestros suplementos clínicos.';

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/soporte`,
            languages: {
                es: `${BASE_URL}/es/soporte`,
                en: `${BASE_URL}/en/soporte`,
                'x-default': `${BASE_URL}/es/soporte`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${lang}/soporte`,
            locale: isEn ? 'en_US' : 'es_CO',
            type: 'website',
            images: [{ url: `${BASE_URL}/logo-advanced-health-COLOR_HORIZONTAL.png`, width: 1200, height: 630, alt: 'Advanced Health Company SAS' }],
        },
    };
}

export default async function SoporteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'es' | 'en');
    const faqs = dict.soporte.faqs as { q: string; a: string }[];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {children}
        </>
    );
}

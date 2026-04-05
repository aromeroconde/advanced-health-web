import { Metadata } from 'next';
import LegalBase from '@/components/LegalBase';
import legalData from '@/lib/legalData.json';

export const metadata: Metadata = {
    title: 'Políticas de Privacidad',
    description: 'Políticas de privacidad y protección de datos personales de Advanced Health Company SAS.',
};

export default async function PrivacyPolicyPage() {
    // Using the same text as Terms of Service as requested by user
    return (
        <LegalBase
            title="Políticas de Privacidad"
            data={legalData.terms as any}
        />
    );
}
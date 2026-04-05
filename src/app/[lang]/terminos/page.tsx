import { Metadata } from 'next';
import LegalBase from '@/components/LegalBase';
import legalData from '@/lib/legalData.json';

export const metadata: Metadata = {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones legales de Advanced Health Company SAS.',
};

export default async function TermsPage() {
    return (
        <LegalBase
            title="Términos y Condiciones"
            data={legalData.terms as any}
        />
    );
}
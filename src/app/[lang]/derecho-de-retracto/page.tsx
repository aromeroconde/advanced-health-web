import { Metadata } from 'next';
import LegalBase from '@/components/LegalBase';
import legalData from '@/lib/legalData.json';

export const metadata: Metadata = {
    title: 'Derecho de Retracto',
    description: 'Políticas y procedimiento para el derecho de retracto en Advanced Health Company SAS.',
};

export default async function RetractPage() {
    return (
        <LegalBase
            title="Derecho de Retracto"
            data={legalData.retract as any}
        />
    );
}
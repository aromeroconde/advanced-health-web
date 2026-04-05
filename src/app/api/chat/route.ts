import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://advwebhookadv.vpsubuntu.advancedhealth.com.co/webhook/0a9b546f-3b7a-4501-943a-7765b253cbe8';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Error al contactar con el asistente n8n' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

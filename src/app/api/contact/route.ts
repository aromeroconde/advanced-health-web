import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Todos los campos son obligatorios.' },
                { status: 400 }
            );
        }

        const { error } = await resend.emails.send({
            from: 'Advanced Health - Formulario Web <no-reply@updates.advancedhealth.com.co>',
            to: ['contacto@advancedhealth.com.co'],
            replyTo: email,
            subject: `Mensaje de ${name} - Advanced Health`,
            html: `
                <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #5448C8;">Nuevo mensaje del formulario de contacto</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                        <tr>
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; font-weight: 700;">Nombre</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; font-weight: 700;">Email</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0;">${email}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 1.5rem;">
                        <p style="font-weight: 700; margin-bottom: 0.5rem;">Mensaje:</p>
                        <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 2rem;" />
                    <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 1rem;">
                        Enviado desde el formulario de contacto de advancedhealth.com.co
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Error al enviar el correo.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact API error:', err);
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}

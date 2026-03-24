import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.FORM_TO_EMAIL; // The email address you want to receive notifications
const fromEmail = process.env.FORM_FROM_EMAIL; // The email address from your verified domain

export async function POST(req: NextRequest) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable.");
        return NextResponse.json({ error: "Server is not configured for Resend." }, { status: 500 });
    }

    if (!toEmail || !fromEmail) {
        console.error("Missing FORM_TO_EMAIL or FORM_FROM_EMAIL environment variables.");
        return NextResponse.json({ error: "Server is not configured for sending emails." }, { status: 500 });
    }

    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            replyTo: email,
            subject: subject ? `${subject} — message from ${name}` : `New Message from ${name} via Portfolio`,
            react: <ContactFormEmail name={name} email={email} message={message} />,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: error.message || 'Failed to send message' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

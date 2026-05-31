import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: 'Contact',
    description: isFr
      ? "Prenez contact avec Ricardo M'Boukou — développeur web disponible pour une alternance webmarketing. Réponse sous 24h."
      : "Get in touch with Ricardo M'Boukou — web developer available for a digital marketing internship. Response within 24h.",
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        fr: '/fr/contact',
        en: '/en/contact',
        'x-default': '/fr/contact',
      },
    },
    openGraph: {
      url: `/${lang}/contact`,
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}

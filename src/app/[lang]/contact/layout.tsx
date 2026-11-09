import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: 'Contact',
    description: isFr
      ? "Prenez contact avec Ricardo M'Boukou — inspecteur qualité et développeur web, ouvert aux postes de développeur d'outils métiers dans l'industrie."
      : "Get in touch with Ricardo M'Boukou — quality inspector and web developer, open to business tools developer roles in industry.",
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

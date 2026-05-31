import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? 'À propos' : 'About',
    description: isFr
      ? "Développeur web fullstack avec une appétence pour le marketing digital — parcours atypique, 11 ans de management opérationnel, IA au quotidien depuis 2023."
      : "Fullstack web developer with a genuine interest in digital marketing — unconventional background, 11 years in operational management, daily AI since 2023.",
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        fr: '/fr/about',
        en: '/en/about',
        'x-default': '/fr/about',
      },
    },
    openGraph: {
      url: `/${lang}/about`,
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}

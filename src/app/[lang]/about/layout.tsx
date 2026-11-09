import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? 'À propos' : 'About',
    description: isFr
      ? "Inspecteur qualité en milieu industriel et développeur web fullstack — parcours atypique, 11 ans de terrain, des outils métiers pensés pour les équipes opérationnelles."
      : "Quality inspector in an industrial setting and fullstack web developer — unconventional background, 11 years hands-on, business tools built for operational teams.",
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

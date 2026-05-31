import Script from 'next/script';
import HomeLoader from './home-loader';
import type { Locale } from '@/i18n.config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ricardomboukou.online';

function PersonJsonLd({ lang }: { lang: Locale }) {
  const isFr = lang === 'fr';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: "Ricardo M'Boukou",
    url: SITE_URL,
    jobTitle: isFr
      ? 'Développeur web · Communication digitale'
      : 'Web Developer · Digital Communication',
    description: isFr
      ? "Développeur web fullstack avec une sensibilité marketing — expériences digitales orientées SEO, conversion et contenu, avec l'IA comme outil du quotidien."
      : "Web developer with a marketing mindset — digital experiences focused on SEO, conversion and content, with AI as an everyday tool.",
    knowsAbout: [
      'Next.js', 'React', 'TypeScript', 'Node.js',
      'SEO technique', 'Marketing digital',
      'Gemini API', 'Claude API',
      'Docker', 'PostgreSQL', 'FastAPI', 'Tailwind CSS',
    ],
    nationality: { '@type': 'Country', name: 'France' },
    // Update these with your real profile URLs
    sameAs: [
      'https://github.com/ricardomboukou',
      'https://www.linkedin.com/in/ricardomboukou',
    ],
  };

  return (
    <Script
      id="person-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <PersonJsonLd lang={lang as Locale} />
      <HomeLoader />
    </>
  );
}

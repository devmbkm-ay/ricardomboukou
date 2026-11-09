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
      ? 'Inspecteur qualité · Développeur web'
      : 'Quality Inspector · Web Developer',
    description: isFr
      ? "Inspecteur qualité et développeur web : je conçois des outils métiers (Next.js, PostgreSQL, Docker) pour fiabiliser la traçabilité et automatiser les contrôles."
      : "Quality inspector and web developer: I build business tools (Next.js, PostgreSQL, Docker) that make traceability reliable and automate quality checks.",
    knowsAbout: [
      'Next.js', 'React', 'TypeScript', 'Node.js',
      'Prisma', 'Git', 'Qualité industrielle', 'Traçabilité',
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

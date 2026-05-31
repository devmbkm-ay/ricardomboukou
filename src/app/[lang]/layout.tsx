import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/shared/navbar';
import { i18n, type Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ricardomboukou.online';

const localeMeta = {
  fr: {
    title: "Ricardo M'Boukou — Développeur web · Communication digitale",
    description: "Développeur web avec une sensibilité marketing — expériences digitales orientées SEO, conversion et contenu, avec l'IA comme outil du quotidien.",
  },
  en: {
    title: "Ricardo M'Boukou — Web Developer · Digital Communication",
    description: "Web developer with a marketing mindset — digital experiences focused on SEO, conversion and content, with AI as an everyday tool.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = localeMeta[lang as Locale] ?? localeMeta.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | Ricardo M'Boukou`,
    },
    description: meta.description,
    authors: [{ name: "Ricardo M'Boukou", url: SITE_URL }],
    creator: "Ricardo M'Boukou",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/fr',
      },
    },
    openGraph: {
      siteName: "Ricardo M'Boukou",
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: lang === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
      url: `/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

type LangLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }

  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Navbar lang={lang as Locale} dictionary={dictionary.navbar} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

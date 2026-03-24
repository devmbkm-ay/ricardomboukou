import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import Navbar from '@/components/shared/navbar';
import { i18n, type Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

type LangLayoutProps = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }

  const dictionary = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar lang={lang as Locale} dictionary={dictionary.navbar} />
      {children}
    </>
  );
}

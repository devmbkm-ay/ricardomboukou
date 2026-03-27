import Button from  '@/components/ui/button';
import type { Locale } from '@/i18n.config';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <section className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center -mt-16">
      {/* The -mt-16 is a simple trick to offset the navbar's height and center the content in the viewport */}
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Ricardo, Full-Stack Developer
        </h1>
        <p className="text-lg md:text-xl text-muted mb-8">
          I build scalable and user-friendly web applications with modern technologies.
          Passionate about clean code, great design, and open source.
        </p>
        <Button
          href={`/${lang}/projects`}
          variant="outline"
          size="default">
          View My Work
        </Button>
      </div>
    </section>
  );
}

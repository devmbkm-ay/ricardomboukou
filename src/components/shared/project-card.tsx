"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Locale } from '@/i18n.config';

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured?: boolean;
  compact?: boolean;
};

const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  projectUrl,
  githubUrl,
  technologies,
  featured = false,
  compact = false,
}: ProjectCardProps) => {
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';

  return (
    <motion.div
      whileHover={featured ? { scale: 1.01 } : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/40 backdrop-blur-sm
        transition-all duration-500
        hover:border-primary/30 hover:shadow-lg
        ${featured ? 'min-h-[500px]' : compact ? 'min-h-[180px] flex-row md:flex-row' : 'min-h-[380px]'}
        ${compact ? 'flex-row' : ''}
      `}
    >
      <Link href={`/${lang}/projects/${id}`} className="absolute inset-0 z-10" aria-label={`View details for ${title}`} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:to-accent/5 group-hover:opacity-100 pointer-events-none" />
      
      {featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">Featured</span>
        </div>
      )}

      {imageUrl && (
        <div className={`
          relative overflow-hidden
          ${compact ? 'w-1/3 min-h-[180px]' : 'w-full'}
          ${featured ? 'h-64 md:h-80' : 'h-48'}
        `}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={featured}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes={featured ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 50vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      )}

      <div className={`
        relative flex flex-col flex-grow p-6
        ${compact ? 'w-2/3 justify-center' : ''}
      `}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className={`
            font-bold text-foreground group-hover:text-primary transition-colors duration-300
            ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}
            ${compact ? 'text-lg' : ''}
          `}>
            {title}
          </h3>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
        </div>

        <p className={`
          text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300
          ${featured ? 'text-base mb-6 line-clamp-3' : 'text-sm mb-4 line-clamp-2'}
          ${compact ? 'line-clamp-2 mb-3' : ''}
        `}>
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {technologies?.slice(0, featured ? undefined : compact ? 3 : 4).map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  inline-flex items-center rounded-full border border-border bg-accent/5 px-3 py-1
                  text-xs font-medium text-muted backdrop-blur-sm
                  transition-all duration-300
                  group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary
                  ${featured ? 'px-4 py-1.5 text-sm' : ''}
                `}
              >
                {tech}
              </motion.span>
            ))}
            {!featured && technologies.length > (compact ? 3 : 4) && (
              <span className="inline-flex items-center rounded-full border border-border bg-accent/5 px-3 py-1 text-xs font-medium text-muted">
                +{technologies.length - (compact ? 3 : 4)}
              </span>
            )}
          </div>
        </div>

        {featured && (
          <div className="relative z-20 mt-6 pt-6 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </Link>
              )}
            </div>
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105"
              >
                Live Demo
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;

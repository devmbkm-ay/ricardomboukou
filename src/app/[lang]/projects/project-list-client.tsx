"use client";

import { useMemo, useState } from 'react';
import type { Project } from '@prisma/client';
import ProjectCard from '@/components/shared/project-card';
import { Sparkles, Filter, Grid3X3, LayoutList, ArrowUpRight } from 'lucide-react';
import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';

interface ProjectListProps {
  projects: Project[];
}

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

// Enhanced animation variants for cards
const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    y: -20, 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 } 
  }
} as const;

// Filter button animation
const filterVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 150
    }
  })
};

export default function ProjectListClient({ projects = [] }: ProjectListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';
  const dictionary = (lang === 'fr' ? fr : en).projectsPage;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  const activeFilter = searchParams.get('filter') || dictionary.allFilter;

  const handleFilterClick = (tech: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tech === dictionary.allFilter) {
      params.delete('filter');
    } else {
      params.set('filter', tech);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project: Project) => {
      project.technologies?.forEach((tech: string) => techSet.add(tech));
    });
    return [dictionary.allFilter, ...Array.from(techSet).sort()];
  }, [dictionary.allFilter, projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === dictionary.allFilter) return projects;
    return projects.filter((project: Project) => project.technologies?.includes(activeFilter));
  }, [activeFilter, dictionary.allFilter, projects]);
  
  const featuredProject = filteredProjects[0];
  const otherProjects = filteredProjects.slice(1);

  const projectCount = filteredProjects.length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-border backdrop-blur-sm mb-6"
            >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted font-medium">{dictionary.badge}</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                <span className="text-foreground">
                    {dictionary.title}
                </span>
            </h1>
            
            <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
                {dictionary.subtitle}
            </p>

            {/* Stats Bar */}
            <div className="flex justify-center gap-8 text-sm text-muted border-t border-b border-border py-4 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">{projects.length}</span>
                    <span>{dictionary.stats.totalProjects}</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">{allTechnologies.length - 1}</span>
                    <span>{dictionary.stats.technologies}</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">{projectCount}</span>
                    <span>{dictionary.stats.shown}</span>
                </div>
            </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
        >
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
                {allTechnologies.map((tech, i) => (
                    <motion.button
                        key={tech}
                        custom={i}
                        variants={filterVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => handleFilterClick(tech)}
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
                        className={`
                            relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                            ${activeFilter === tech 
                                ? 'bg-primary text-primary-foreground shadow-md' 
                                : 'bg-accent/5 border border-border text-muted hover:border-primary/50 hover:text-foreground hover:bg-accent/10'
                            }
                        `}
                    >
                        {tech}
                        {activeFilter === tech && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-primary rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        {hoveredTech === tech && activeFilter !== tech && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-accent/5 rounded-full -z-10"
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-accent/5 border border-border rounded-full p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted hover:text-foreground'}`}
                >
                    <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted hover:text-foreground'}`}
                >
                    <LayoutList className="w-4 h-4" />
                </button>
            </div>
        </motion.div>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeFilter + viewMode}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="space-y-16"
            >
                {/* Featured Project */}
                {featuredProject && (
                    <motion.section variants={itemVariants} className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            <h2 className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {activeFilter === dictionary.allFilter
                                  ? dictionary.featuredProject
                                  : `${dictionary.topProjectPrefix} ${activeFilter} ${dictionary.topProjectSuffix}`.trim()}
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        </div>
                        <motion.div 
                            className="group relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-background border border-border rounded-3xl overflow-hidden backdrop-blur-sm">
                                <ProjectCard {...featuredProject} />
                            </div>
                        </motion.div>
                    </motion.section>
                )}

                {/* Other Projects Grid */}
                {otherProjects.length > 0 && (
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">{dictionary.moreProjects}</h2>
                            <span className="text-xs text-muted">{otherProjects.length} {dictionary.projectsCountSuffix}</span>
                        </div>
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}>
                            {otherProjects.map((project, index) => (
                                <motion.div
                                    key={project.id || (lang === 'fr' ? project.titleFr : project.titleEn)}
                                    variants={itemVariants}
                                    custom={index}
                                    whileHover={{ y: -5 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 blur-sm" />
                                    <div className="relative bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
                                        <ProjectCard {...project} compact={viewMode === 'list'} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div variants={itemVariants} className="text-center py-24 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl" />
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/5 border border-border flex items-center justify-center">
                                <Filter className="w-8 h-8 text-muted" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{dictionary.emptyTitle}</h3>
                            <p className="text-muted mb-8 max-w-md mx-auto">
                                {dictionary.emptyBody.replace('{filter}', activeFilter)}
                            </p>
                            <motion.button
                                onClick={() => handleFilterClick(dictionary.allFilter)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-colors"
                            >
                                {dictionary.emptyButton}
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        {filteredProjects.length > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-24 text-center"
            >
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
                <p className="text-muted mb-4">{dictionary.bottomCtaLead}</p>
                <motion.a
                    href={`/${lang}/contact`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                >
                    {dictionary.bottomCtaLink}
                    <ArrowUpRight className="w-5 h-5" />
                </motion.a>
            </motion.div>
        )}
      </div>
    </div>
  );
}

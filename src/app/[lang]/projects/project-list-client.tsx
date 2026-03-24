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
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-zinc-300 font-medium">{dictionary.badge}</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {dictionary.title}
                </span>
            </h1>
            
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
                {dictionary.subtitle}
            </p>

            {/* Stats Bar */}
            <div className="flex justify-center gap-8 text-sm text-zinc-500 border-t border-b border-white/10 py-4 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{projects.length}</span>
                    <span>{dictionary.stats.totalProjects}</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{allTechnologies.length - 1}</span>
                    <span>{dictionary.stats.technologies}</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{projectCount}</span>
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
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                                : 'bg-white/5 border border-white/10 text-zinc-400 hover:border-purple-500/50 hover:text-white hover:bg-white/10'
                            }
                        `}
                    >
                        {tech}
                        {activeFilter === tech && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-white rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        {hoveredTech === tech && activeFilter !== tech && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/5 rounded-full -z-10"
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
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
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {activeFilter === dictionary.allFilter
                                  ? dictionary.featuredProject
                                  : `${dictionary.topProjectPrefix} ${activeFilter} ${dictionary.topProjectSuffix}`.trim()}
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                        </div>
                        <motion.div 
                            className="group relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                                <ProjectCard {...featuredProject} />
                            </div>
                        </motion.div>
                    </motion.section>
                )}

                {/* Other Projects Grid */}
                {otherProjects.length > 0 && (
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">{dictionary.moreProjects}</h2>
                            <span className="text-xs text-zinc-600">{otherProjects.length} {dictionary.projectsCountSuffix}</span>
                        </div>
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}>
                            {otherProjects.map((project, index) => (
                                <motion.div
                                    key={project.id || project.title}
                                    variants={itemVariants}
                                    custom={index}
                                    whileHover={{ y: -5 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 blur-sm" />
                                    <div className="relative bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
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
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl" />
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <Filter className="w-8 h-8 text-zinc-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{dictionary.emptyTitle}</h3>
                            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                                {dictionary.emptyBody.replace('{filter}', activeFilter)}
                            </p>
                            <motion.button
                                onClick={() => handleFilterClick(dictionary.allFilter)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
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
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
                <p className="text-zinc-500 mb-4">{dictionary.bottomCtaLead}</p>
                <motion.a
                    href={`/${lang}/contact`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-purple-400 transition-colors"
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

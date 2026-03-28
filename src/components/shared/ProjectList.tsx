"use client";

import { useMemo } from 'react';
import type { Project } from '@prisma/client';
import ProjectCard from '@/components/shared/project-card';
import { Sparkles } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectListProps {
    projects: Project[];
}

// Animation variants for the container of the project cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Animation variants for each individual project card
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
};

export default function ProjectList({ projects }: ProjectListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeFilter = searchParams.get('filter') || 'All';

    const handleFilterClick = (tech: string) => {
        const params = new URLSearchParams(searchParams);
        if (tech === 'All') {
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
        return ['All', ...Array.from(techSet).sort()];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter((project: Project) => project.technologies?.includes(activeFilter));
    }, [activeFilter, projects]);

    const featuredProject = filteredProjects[0];
    const otherProjects = filteredProjects.slice(1);

    return (
        <div>
            {/* Filter Bar remains the same */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {allTechnologies.map(tech => (
                    <button
                        key={tech}
                        onClick={() => handleFilterClick(tech)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === tech ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            {/* AnimatePresence allows items to animate out when they are removed from the list */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter} // Re-render this component when the filter changes
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                    className="space-y-8"
                >
                    {/* Featured Project */}
                    {featuredProject && (
                        <motion.div variants={itemVariants} className="mb-12">
                            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {activeFilter === 'All' ? 'Featured Project' : `Top Project in ${activeFilter}`}
                            </h2>
                            <ProjectCard {...featuredProject} />
                        </motion.div>
                    )}

                    {/* Other Projects */}
                    {otherProjects.length > 0 && (
                        <div>
                            <motion.h2 variants={itemVariants} className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                                More Projects
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {otherProjects.map((project: Project) => (
                                    <motion.div key={project.id || project.titleEn || project.titleFr} variants={itemVariants}>
                                        <ProjectCard {...project} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results Message */}
                    {filteredProjects.length === 0 && (
                        <motion.div variants={itemVariants} className="text-center py-16">
                            <p className="text-xl text-zinc-400">No projects found for &quot;{activeFilter}&quot;.</p>
                            <button
                                onClick={() => handleFilterClick('All')}
                                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Show All Projects
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

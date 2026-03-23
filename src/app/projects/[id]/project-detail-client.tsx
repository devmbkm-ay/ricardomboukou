"use client";
//Project Detail Page - Client Component
import Image from 'next/image';
import Link from 'next/link';
import { 
 Github, 
 ArrowUpRight, 
 Calendar, 
 Code, 
 ChevronLeft,
 ExternalLink,
 Layers,
 Clock,
 Sparkles,
 CheckCircle2
} from 'lucide-react';
import type { Project } from '@prisma/client';
import { motion } from 'framer-motion';

// Animation components now live inside the Client Component
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
 <div 
 style={{ 
 animation: `fadeInUp 0.8s ease-out ${delay}s both`,
 }}
 >
 {children}
 <style jsx>{`
 @keyframes fadeInUp {
 from { opacity: 0; transform: translateY(30px); }
 to { opacity: 1; transform: translateY(0); }
 }
 `}</style>
 </div>
);

const StaggerContainer = ({ children }: { children: React.ReactNode }) => (
 <div style={{ animation: 'staggerIn 0.6s ease-out 0.3s both' }}>
 {children}
 <style jsx>{`
 @keyframes staggerIn {
 from { opacity: 0; }
 to { opacity: 1; }
 }
 `}</style>
 </div>
);

type ProjectDetailClientProps = {
 project: Project;
};

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
 return (
 <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
 {/* Background Ambient Effects */}
 <div className="fixed inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
 <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
 </div>

 <div className="relative z-10 pt-24">
 {/* Navigation Bar */}
 <div className="container mx-auto px-6 py-6">
 <FadeIn>
 <Link 
 href="/projects"
 className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
 >
 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
 <ChevronLeft className="w-5 h-5" />
 </div>
 <span className="font-medium">Back to Projects</span>
 </Link>
 </FadeIn>
 </div>

 {/* Hero Section */}
 <section className="container mx-auto px-6 pb-12">
 <div className="max-w-5xl mx-auto">
 <FadeIn delay={0.1}>
 {/* Category Badge */}
 <div className="flex items-center gap-3 mb-6">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
 <Sparkles className="w-4 h-4 text-purple-400" />
 <span className="text-sm font-medium text-purple-300">Featured Project</span>
 </div>
 <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-purple-500/50 to-transparent" />
 </div>
 </FadeIn>

 <FadeIn delay={0.2}>
 <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
 <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
 {project.title}
 </span>
 </h1>
 </FadeIn>

 <FadeIn delay={0.3}>
 <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-8">
 {project.description}
 </p>
 </FadeIn>

 {/* Quick Stats */}
 <FadeIn delay={0.4}>
 <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
 <div className="flex items-center gap-2">
 <Calendar className="w-4 h-4" />
 <span>{new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
 </div>
 <div className="w-px h-4 bg-white/10" />
 <div className="flex items-center gap-2">
 <Layers className="w-4 h-4" />
 <span>{project.technologies.length} Technologies</span>
 </div>
 <div className="w-px h-4 bg-white/10" />
 <div className="flex items-center gap-2">
 <Clock className="w-4 h-4" />
 <span>2 min read</span>
 </div>
 </div>
 </FadeIn>
 </div>
 </section>

 {/* Hero Image */}
 {project.imageUrl && (
 <section className="container mx-auto px-6 mb-16">
 <FadeIn delay={0.5}>
 <div className="relative max-w-6xl mx-auto">
 {/* Glow Effect */}
 <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-50" />
 
 <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50">
 <div className="aspect-[21/9] relative">
 <Image
 src={project.imageUrl}
 alt={project.title}
 fill
 className="object-cover"
 priority
 sizes="(max-width: 1200px) 100vw, 1200px"
 />
 {/* Overlay Gradient */}
 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
 </div>
 
 {/* Floating Action Bar */}
 <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
 <div className="flex gap-3">
 {project.githubUrl && (
 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
 >
 <Github className="w-4 h-4" />
 <span className="text-sm font-medium">View Code</span>
 </a>
 )}
 </div>
 {project.projectUrl && (
 <a
 href={project.projectUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-105"
 >
 <span>Live Demo</span>
 <ExternalLink className="w-4 h-4" />
 </a>
 )}
 </div>
 </div>
 </div>
 </FadeIn>
 </section>
 )}

 {/* Main Content Grid */}
 <section className="container mx-auto px-6 pb-24">
 <div className="max-w-6xl mx-auto">
 <div className="grid lg:grid-cols-3 gap-12">
 {/* Left Column - Content */}
 <div className="lg:col-span-2 space-y-12">
 <StaggerContainer>
 {/* Overview Section */}
 <div className="space-y-6">
 <div className="flex items-center gap-3 mb-6">
 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
 <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Project Overview</h2>
 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
 </div>
 
 <div className="prose prose-invert prose-lg max-w-none">
 <p className="text-zinc-300 leading-relaxed text-lg">
 This project represents a comprehensive solution built with modern technologies 
 and best practices. Every aspect was carefully considered to ensure scalability, 
 maintainability, and exceptional user experience.
 </p>
 <p className="text-zinc-400 leading-relaxed">
 {project.description} The implementation focuses on clean architecture, 
 type safety, and performance optimization. Special attention was given to 
 the developer experience and long-term maintainability of the codebase.
 </p>
 </div>
 </div>

 {/* Key Features */}
 <div className="space-y-6 mt-12">
 <h3 className="text-xl font-semibold text-white flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-purple-400" />
 Key Features
 </h3>
 <div className="grid sm:grid-cols-2 gap-4">
 {[
 'Responsive Design',
 'Type Safety',
 'Performance Optimized',
 'Clean Architecture',
 'Modern UI/UX',
 'Scalable Infrastructure'
 ].map((feature, index) => (
 <div 
 key={feature}
 className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors"
 >
 <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-semibold text-sm">
 {String(index + 1).padStart(2, '0')}
 </div>
 <span className="text-zinc-300 font-medium">{feature}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Technical Deep Dive */}
 <div className="space-y-6 mt-12">
 <h3 className="text-xl font-semibold text-white">Technical Implementation</h3>
 <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
 <p className="text-zinc-400 leading-relaxed mb-4">
 The project leverages a modern stack including Next.js 14 with App Router, 
 TypeScript for type safety, and Tailwind CSS for styling. The database layer 
 uses Prisma ORM with PostgreSQL for reliable data persistence.
 </p>
 <p className="text-zinc-400 leading-relaxed">
 Docker containerization ensures consistent deployments across environments, 
 while CI/CD pipelines automate testing and deployment workflows.
 </p>
 </div>
 </div>
 </StaggerContainer>
 </div>

 {/* Right Column - Sidebar */}
 <aside className="lg:col-span-1 space-y-6">
 <StaggerContainer>
 {/* Action Card */}
 <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 sticky top-24">
 <h3 className="text-lg font-semibold text-white mb-4">Project Links</h3>
 
 <div className="space-y-3 mb-6">
 {project.projectUrl && (
 <a
 href={project.projectUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-between p-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all group"
 >
 <span className="flex items-center gap-2">
 <ExternalLink className="w-4 h-4" />
 Live Demo
 </span>
 <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
 </a>
 )}
 
 {project.githubUrl && (
 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all group"
 >
 <span className="flex items-center gap-2">
 <Github className="w-4 h-4" />
 Source Code
 </span>
 <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
 </a>
 )}
 </div>

 <div className="pt-6 border-t border-white/10">
 <p className="text-sm text-zinc-500 mb-2">Have questions?</p>
 <Link 
 href="/contact"
 className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
 >
 Discuss this project →
 </Link>
 </div>
 </div>

 {/* Technologies Stack */}
 <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10">
 <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
 <Code className="w-5 h-5 text-purple-400" />
 Tech Stack
 </h3>
 <div className="flex flex-wrap gap-2">
 {project.technologies.map((tech: string, index: number) => (
 <span 
 key={tech}
 className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-300 transition-all cursor-default"
 style={{ animationDelay: `${index * 50}ms` }}
 >
 {tech}
 </span>
 ))}
 </div>
 </div>

 {/* Project Info */}
 <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10">
 <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
 <Calendar className="w-5 h-5 text-purple-400" />
 Details
 </h3>
 <div className="space-y-4 text-sm">
 <div className="flex justify-between">
 <span className="text-zinc-500">Created</span>
 <span className="text-zinc-300">
 {new Date(project.createdAt).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 day: 'numeric'
 })}
 </span>
 </div>
 <div className="flex justify-between">
 <span className="text-zinc-500">Status</span>
 <span className="inline-flex items-center gap-1.5 text-green-400">
 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
 Completed
 </span>
 </div>
 <div className="flex justify-between">
 <span className="text-zinc-500">Type</span>
 <span className="text-zinc-300">Full-Stack</span>
 </div>
 </div>
 </div>
 </StaggerContainer>
 </aside>
 </div>
 </div>
 </section>

 {/* Next Project CTA */}
 <section className="container mx-auto px-6 py-24 border-t border-white/10">
 <div className="max-w-4xl mx-auto text-center">
 <FadeIn>
 <p className="text-zinc-500 mb-4">Want to see more?</p>
 <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
 Explore other projects
 </h2>
 <Link
 href="/projects"
 className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-purple-500/30 transition-all"
 >
 View All Projects
 <ArrowUpRight className="w-5 h-5" />
 </Link>
 </FadeIn>
 </div>
 </section>
 </div>
 </div>
 );
}

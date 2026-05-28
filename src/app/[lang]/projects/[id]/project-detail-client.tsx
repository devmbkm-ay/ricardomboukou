"use client";
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
    CheckCircle2,
    Users,
    Heart,
    BarChart3,
    Lightbulb,
    Target,
} from 'lucide-react';
import type { Project } from '@prisma/client';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';

type CaseStudyPersona = {
    nameEn: string;
    nameFr: string;
    needEn: string;
    needFr: string;
    icon: 'Users' | 'Heart' | 'BarChart3' | 'Target';
};

type CaseStudyKpi = {
    labelEn: string;
    labelFr: string;
    value: string;
};

type CaseStudy = {
    problemEn: string;
    problemFr: string;
    personas: CaseStudyPersona[];
    kpis: CaseStudyKpi[];
    challengeEn: string;
    challengeFr: string;
    insightEn: string;
    insightFr: string;
};

const personaIconMap = {
    Users,
    Heart,
    BarChart3,
    Target,
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div style={{ animation: `fadeInUp 0.8s ease-out ${delay}s both` }}>
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
    const params = useParams<{ lang: Locale }>();
    const lang = params?.lang ?? 'en';
    const dictionary = (lang === 'fr' ? fr : en).projectDetailPage;
    const caseStudyDict = (lang === 'fr' ? fr : en).caseStudy;

    const title = lang === 'fr' ? project.titleFr : project.titleEn;
    const description = lang === 'fr' ? project.descriptionFr : project.descriptionEn;

    const caseStudy = project.caseStudy as CaseStudy | null;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 pt-24">
                {/* Navigation Bar */}
                <div className="container mx-auto px-6 py-6">
                    <FadeIn>
                        <Link
                            href={`/${lang}/projects`}
                            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent/5 border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-primary/30 transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{dictionary.back}</span>
                        </Link>
                    </FadeIn>
                </div>

                {/* Hero Section */}
                <section className="container mx-auto px-6 pb-12">
                    <div className="max-w-5xl mx-auto">
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">{dictionary.featuredBadge}</span>
                                </div>
                                {caseStudy && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                                        <BarChart3 className="w-4 h-4 text-accent-foreground/60" />
                                        <span className="text-sm font-medium text-accent-foreground/60">Case Study</span>
                                    </div>
                                )}
                                <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-primary/20 to-transparent" />
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
                                {title}
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed mb-8">
                                {description}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(project.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long' })}</span>
                                </div>
                                <div className="w-px h-4 bg-border" />
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    <span>{project.technologies.length} {dictionary.technologiesCount}</span>
                                </div>
                                <div className="w-px h-4 bg-border" />
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{dictionary.readTime}</span>
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
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl opacity-50" />
                                <div className="relative rounded-3xl overflow-hidden border border-border bg-accent/5">
                                    <div className="aspect-[21/9] relative">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.titleEn}
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                        <div className="flex gap-3">
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground hover:bg-background/80 transition-all">
                                                    <Github className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{dictionary.viewCode}</span>
                                                </a>
                                            )}
                                        </div>
                                        {project.projectUrl && (
                                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105">
                                                <span>{dictionary.liveDemo}</span>
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
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-12">
                                <StaggerContainer>
                                    {caseStudy ? (
                                        <CaseStudyContent
                                            caseStudy={caseStudy}
                                            lang={lang}
                                            dict={caseStudyDict}
                                        />
                                    ) : (
                                        <GenericContent dictionary={dictionary} />
                                    )}
                                </StaggerContainer>
                            </div>

                            {/* Right Sidebar */}
                            <aside className="lg:col-span-1 space-y-6">
                                <StaggerContainer>
                                    <div className="p-6 rounded-2xl bg-accent/5 border border-border sticky top-24">
                                        <h3 className="text-lg font-semibold text-foreground mb-4">{dictionary.linksTitle}</h3>
                                        <div className="space-y-3 mb-6">
                                            {project.projectUrl && (
                                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all group">
                                                    <span className="flex items-center gap-2">
                                                        <ExternalLink className="w-4 h-4" />
                                                        {dictionary.liveDemo}
                                                    </span>
                                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 rounded-xl bg-background border border-border text-foreground hover:bg-accent/10 hover:border-primary/30 transition-all group">
                                                    <span className="flex items-center gap-2">
                                                        <Github className="w-4 h-4" />
                                                        {dictionary.sourceCode}
                                                    </span>
                                                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="pt-6 border-t border-border">
                                            <p className="text-sm text-muted mb-2">{dictionary.questions}</p>
                                            <Link href={`/${lang}/contact`} className="text-sm text-primary hover:opacity-80 transition-colors">
                                                {dictionary.discussProject}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-accent/5 border border-border">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Code className="w-5 h-5 text-primary" />
                                            {dictionary.techStack}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech: string, index: number) => (
                                                <span key={tech}
                                                    className="px-3 py-1.5 rounded-lg bg-accent/10 border border-border text-muted text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                                                    style={{ animationDelay: `${index * 50}ms` }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-accent/5 border border-border">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            {dictionary.details}
                                        </h3>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted">{dictionary.created}</span>
                                                <span className="text-foreground">
                                                    {new Date(project.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted">{dictionary.status}</span>
                                                <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    {dictionary.completed}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted">{dictionary.type}</span>
                                                <span className="text-foreground">{dictionary.fullStack}</span>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerContainer>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-6 py-24 border-t border-border">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <p className="text-muted mb-4">{dictionary.moreLead}</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{dictionary.moreTitle}</h2>
                            <Link href={`/${lang}/projects`}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent/5 border border-border text-foreground font-semibold hover:bg-accent/10 hover:border-primary/30 transition-all">
                                {dictionary.moreButton}
                                <ArrowUpRight className="w-5 h-5" />
                            </Link>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </div>
    );
}

function CaseStudyContent({
    caseStudy,
    lang,
    dict,
}: {
    caseStudy: CaseStudy;
    lang: string;
    dict: { problemTitle: string; personasTitle: string; kpisTitle: string; challengeTitle: string; insightTitle: string };
}) {
    const problem = lang === 'fr' ? caseStudy.problemFr : caseStudy.problemEn;
    const challenge = lang === 'fr' ? caseStudy.challengeFr : caseStudy.challengeEn;
    const insight = lang === 'fr' ? caseStudy.insightFr : caseStudy.insightEn;

    return (
        <div className="space-y-12">
            {/* Problem */}
            <div className="space-y-4">
                <SectionTitle>{dict.problemTitle}</SectionTitle>
                <p className="text-foreground/80 leading-relaxed text-lg">{problem}</p>
            </div>

            {/* Personas */}
            {caseStudy.personas?.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {dict.personasTitle}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {caseStudy.personas.map((persona, i) => {
                            const IconComponent = personaIconMap[persona.icon] ?? Users;
                            const name = lang === 'fr' ? persona.nameFr : persona.nameEn;
                            const need = lang === 'fr' ? persona.needFr : persona.needEn;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-2xl border border-border bg-accent/5 hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <IconComponent className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="font-semibold text-foreground">{name}</span>
                                    </div>
                                    <p className="text-sm text-muted leading-relaxed">{need}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* KPIs */}
            {caseStudy.kpis?.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        {dict.kpisTitle}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {caseStudy.kpis.map((kpi, i) => {
                            const label = lang === 'fr' ? kpi.labelFr : kpi.labelEn;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="p-4 rounded-2xl border border-border bg-accent/5 text-center hover:border-primary/30 hover:bg-primary/5 transition-all"
                                >
                                    <div className="text-3xl font-bold text-primary mb-1">{kpi.value}</div>
                                    <div className="text-xs text-muted font-medium">{label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Challenge */}
            {challenge && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        {dict.challengeTitle}
                    </h3>
                    <div className="p-6 rounded-2xl bg-accent/5 border border-border">
                        <p className="text-muted leading-relaxed">{challenge}</p>
                    </div>
                </div>
            )}

            {/* Insight */}
            {insight && (
                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lightbulb className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{dict.insightTitle}</p>
                            <p className="text-foreground font-medium leading-relaxed">{insight}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function GenericContent({ dictionary }: { dictionary: typeof en.projectDetailPage }) {
    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <SectionTitle>{dictionary.overview}</SectionTitle>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-foreground/80 leading-relaxed text-lg">{dictionary.overviewBody1}</p>
                </div>
            </div>

            <div className="space-y-6 mt-12">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {dictionary.featuresTitle}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {dictionary.features.map((feature, index) => (
                        <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-border hover:border-primary/30 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <span className="text-muted font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 mt-12">
                <h3 className="text-xl font-semibold text-foreground">{dictionary.technicalTitle}</h3>
                <div className="p-6 rounded-2xl bg-accent/5 border border-border">
                    <p className="text-muted leading-relaxed mb-4">{dictionary.technicalBody1}</p>
                    <p className="text-muted leading-relaxed">{dictionary.technicalBody2}</p>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">{children}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
    );
}

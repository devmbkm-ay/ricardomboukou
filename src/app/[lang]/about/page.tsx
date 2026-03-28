
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Brain,
  Database,
  Container,
  Bitcoin,
  Dumbbell,
  Music,
  TrendingUp,
  Code2,
  Terminal,
  Cpu,
  Globe,
  ArrowUpRight,
  Sparkles,
  Quote
} from 'lucide-react';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import Image from 'next/image';


// Skill data structure
const skillCards = [
  { icon: Brain, level: 95, color: 'from-purple-500 to-pink-500' },
  { icon: Container, level: 90, color: 'from-blue-500 to-cyan-500' },
  { icon: Database, level: 88, color: 'from-emerald-500 to-teal-500' },
  { icon: Terminal, level: 92, color: 'from-orange-500 to-red-500' },
  { icon: Code2, level: 94, color: 'from-violet-500 to-purple-500' },
  { icon: Cpu, level: 85, color: 'from-rose-500 to-pink-500' },
];

const interestIcons = [
  Dumbbell,
  Music,
  Bitcoin,
  TrendingUp,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';
  const dictionary = (lang === 'fr' ? fr : en).aboutPage;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"
        />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent:70%)] opacity-10" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20 px-6">
        <motion.div
          style={{ opacity }}
          className="container mx-auto max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-border backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted font-medium">{dictionary.badge}</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="text-foreground">Ricardo</span>
                <span className="block mt-2 text-primary">
                  {dictionary.heroRole}
                </span>
              </h1>

              <p className="text-xl text-muted leading-relaxed mb-8">
                {dictionary.heroIntro}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${lang}/projects`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
                  >
                    {dictionary.ctaProjects}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${lang}/contact`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-accent/5 backdrop-blur-sm text-foreground font-semibold hover:bg-accent/10 transition-all"
                  >
                    {dictionary.ctaContact}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
              style={{
                x: mousePosition.x,
                y: mousePosition.y
              }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl" />

                {/* Image Container */}
                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                  <Image
                    src="/images/profile.png"
                    alt="Profile Photo"
                    fill
                    className="object-cover object-center z-0"
                  />
                  {/* Placeholder for your image */}
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">R</span>
                      </div>
                      <p className="text-zinc-500">{dictionary.photoPlaceholder}</p>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-6 left-6 right-6 z-20"
                  >
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      {dictionary.heroStats.map((stat, index) => (
                        <div
                          key={stat.label}
                          className={index === 1 ? 'text-center border-x border-white/10' : 'text-center'}
                        >
                          <div className="text-2xl font-bold text-white">{stat.num}</div>
                          <div className="text-xs text-zinc-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Quotes */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {dictionary.philosophies.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-accent/5 border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-primary/50 mb-4" />
                <p className="text-foreground font-medium mb-3 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">
                  {item.context}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-2xl transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {dictionary.skillsTitle}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {dictionary.skillsSubtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCards.map((skill, index) => (
              <motion.div
                key={dictionary.skills[index]}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-accent/5 border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {dictionary.skills[index]}
                </h3>

                {/* Progress Bar */}
                <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-primary`}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {dictionary.interestsTitle}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {dictionary.interestsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dictionary.interests.map((interest, index) => {
              const Icon = interestIcons[index];
              return (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 rounded-2xl bg-accent/5 border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {interest.name}
                  </h3>
                  <p className="text-sm text-muted">
                    {interest.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center"
        >
          <div className="relative p-12 rounded-3xl bg-accent/5 border border-border backdrop-blur-sm overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 relative z-10">
              {dictionary.ctaTitle}
            </h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto relative z-10">
              {dictionary.ctaBody}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all relative z-10"
              >
                {dictionary.ctaButton}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Custom Styles for Gradient Animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}

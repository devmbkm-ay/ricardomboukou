// app/contact/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-white' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-400' },
];

export default function ContactPage() {
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';
  const dictionary = (lang === 'fr' ? fr : en).contactPage;
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || dictionary.form.fallbackError);
      }

      setFormState('success');
      formRef.current?.reset();
    } catch (error: any) {
      toast.error(error.message);
      setFormState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-24 text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-border backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted font-medium">{dictionary.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">{dictionary.titleLine1}</span>
              <span className="block mt-2 text-primary">
                {dictionary.titleLine2}
              </span>
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto">
              {dictionary.intro}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-accent/5 border border-border backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-foreground mb-6">{dictionary.contactInfoTitle}</h3>

                <div className="space-y-6">
                  <a href="mailto:dev.mbkm@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-muted group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{dictionary.emailLabel}</p>
                      <p className="text-foreground group-hover:text-primary transition-colors">dev.mbkm@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-muted" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{dictionary.locationLabel}</p>
                      <p className="text-foreground">{dictionary.locationValue}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted mb-4">{dictionary.followMe}</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-accent/5 border border-border flex items-center justify-center text-muted transition-all hover:scale-110 hover:border-primary/30 ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-2xl bg-accent/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{dictionary.availability}</span>
                </div>
                <p className="text-muted text-sm">
                  {dictionary.availabilityBody}
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-3xl bg-accent/5 border border-border backdrop-blur-sm"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">{dictionary.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder={dictionary.form.namePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">{dictionary.form.email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder={dictionary.form.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium text-muted">{dictionary.form.subject}</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder={dictionary.form.subjectPlaceholder}
                  />
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-medium text-muted">{dictionary.form.message}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder={dictionary.form.messagePlaceholder}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState !== 'idle'}
                  whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${formState === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                >
                  {formState === 'idle' && (
                    <>
                      {dictionary.form.submit}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                  {formState === 'submitting' && (
                    <>
                      {dictionary.form.submitting}
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      {dictionary.form.success}
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            variants={itemVariants}
            className="mt-24 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">{dictionary.faqTitle}</h2>
            <div className="space-y-4">
              {dictionary.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-accent/5 border border-border hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Mail, KeyRound, User } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" } }
};

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';
  const dictionary = (lang === 'fr' ? fr : en).auth.register;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!name || !email || !password) {
      setError(dictionary.requiredError);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push(`/${lang}/auth/login`);
      } else {
        const data = await res.json();
        setError(data.error || dictionary.unexpectedError);
      }
    } catch (err: any) {
      setError(dictionary.unexpectedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative p-8 rounded-3xl bg-accent/5 border border-border backdrop-blur-sm shadow-xl">
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-center text-foreground mb-2">
            {dictionary.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-center text-muted mb-8">
            {dictionary.subtitle}
          </motion.p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="relative">
              <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder={dictionary.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="email"
                placeholder={dictionary.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <KeyRound className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="password"
                placeholder={dictionary.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </motion.div>
            
            {error && (
              <motion.p variants={itemVariants} className="text-sm text-center text-red-500 font-medium">
                {error}
              </motion.p>
            )}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? dictionary.submitting : dictionary.submit}
                {!isLoading && <ArrowUpRight className="w-4 h-4" />}
              </button>
            </motion.div>
          </form>

          <motion.p variants={itemVariants} className="text-center text-sm text-muted mt-8">
            {dictionary.footerPrefix}{' '}
            <Link href={`/${lang}/auth/login`} className="font-semibold text-primary hover:opacity-80 transition-all">
              {dictionary.footerLink}
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

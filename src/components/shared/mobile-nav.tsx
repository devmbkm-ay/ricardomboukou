"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavLinks from './nav-links';
import ThemeToggle from './theme-toggle';

type Dictionary = {
    home: string;
    about: string;
    projects: string;
    contact: string;
    dashboard: string;
    login: string;
    logout: string;
};

export default function MobileNav({ lang, dictionary, isAuthenticated }: { lang: string, dictionary: Dictionary, isAuthenticated: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="lg:hidden">
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                {isMenuOpen ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                        <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )}
            </button>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        id="mobile-nav"
                        className="absolute top-full left-0 w-full border-t border-border bg-background/95 text-foreground shadow-xl backdrop-blur-xl"
                        onClick={closeMenu}
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <NavLinks 
                                lang={lang}
                                dictionary={dictionary}
                                isAuthenticated={isAuthenticated}
                            />
                            <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted">
                                <span>{lang === 'fr' ? 'Thème' : 'Theme'}</span>
                                <ThemeToggle lang={lang} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

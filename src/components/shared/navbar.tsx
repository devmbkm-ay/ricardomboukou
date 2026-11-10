"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from '@/i18n.config';

import { Logo } from './logo';
import MobileNav from './mobile-nav';
import NavLinks from './nav-links';
import ThemeToggle from './theme-toggle';

type NavbarDictionary = {
    home: string;
    about: string;
    projects: string;
    contact: string;
    dashboard: string;
    login: string;
    logout: string;
    tagline?: string;
};

const Navbar = ({ lang, dictionary }: { lang: Locale; dictionary: NavbarDictionary }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await fetch('/api/auth/status', { credentials: 'include' });
                if (!res.ok) {
                    setIsAuthenticated(false);
                    return;
                }

                const data = await res.json();
                setIsAuthenticated(Boolean(data.isAuthenticated));
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/${lang}`}
                        className="flex items-center group transition-opacity hover:opacity-80"
                        aria-label="Go to homepage"
                    >
                        <div className="hidden lg:block">
                            <Logo variant="full" tagline={dictionary.tagline} />
                        </div>
                        <div className="block lg:hidden">
                            <Logo variant="mark" />
                        </div>
                    </Link>

                    {/* Mobile nav trigger will be part of MobileNav */}
                    <MobileNav
                        lang={lang}
                        dictionary={dictionary}
                        isAuthenticated={isAuthenticated}
                    />

                    {/* Desktop nav */}
                    <div className="hidden items-center space-x-4 text-base lg:flex">
                        <NavLinks
                            lang={lang}
                            dictionary={dictionary}
                            isAuthenticated={isAuthenticated}
                        />
                        <div className="h-6 w-px bg-border mx-2"></div>
                        <ThemeToggle lang={lang} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

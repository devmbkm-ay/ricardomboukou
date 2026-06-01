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
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-[#f8fafc]/60 dark:bg-[#020617]/60 backdrop-blur-lg">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/${lang}`}
                        className="flex items-center group transition-opacity hover:opacity-80"
                        aria-label="Go to homepage"
                    >
                        <div className="hidden sm:block">
                            <Logo variant="full" animated={false} />
                        </div>
                        <div className="block sm:hidden">
                            <Logo variant="mark" animated={false} />
                        </div>
                    </Link>

                    {/* Mobile nav trigger will be part of MobileNav */}
                    <MobileNav
                        lang={lang}
                        dictionary={dictionary}
                        isAuthenticated={isAuthenticated}
                    />

                    {/* Desktop nav */}
                    <div className="hidden items-center space-x-6 text-lg sm:flex">
                        <NavLinks
                            lang={lang}
                            dictionary={dictionary}
                            isAuthenticated={isAuthenticated}
                        />
                        <div className="h-6 w-px bg-border mx-2"></div>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

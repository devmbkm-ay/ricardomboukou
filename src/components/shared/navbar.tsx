"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from '@/i18n.config';

import MobileNav from './mobile-nav';
import NavLinks from './nav-links';

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
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-lg">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/${lang}`}
                        className="flex items-center"
                        aria-label="Go to homepage"
                    >
                        <Image
                            src="/images/logo-4.png"
                            alt="MBK full logo"
                            width={360}
                            height={120}
                            priority
                            className="hidden h-12 w-auto object-contain sm:block sm:h-14"
                        />
                        <Image
                            src="/images/logo-2.png"
                            alt="MBK logo mark"
                            width={120}
                            height={120}
                            priority
                            className="block h-10 w-auto object-contain sm:hidden"
                        />
                        <span className="sr-only">MBK</span>
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
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await fetch('/api/auth/status');
                if (res.ok) {
                    const data = await res.json();
                    setIsAuthenticated(data.isAuthenticated);
                }
            } catch (error) {
                console.error('Failed to check auth status', error);
                setIsAuthenticated(false);
            } finally {
                setIsAuthLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsAuthenticated(false);
            router.push('/auth/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    const baseNavLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/contact", label: "Contact" }
    ];

    const getNavLinks = () => {
        if (isAuthLoading) return baseNavLinks;
        if (isAuthenticated) {
            return [...baseNavLinks, { href: "/admin/dashboard", label: "Dashboard" }];
        }
        return [...baseNavLinks, { href: "/auth/login", label: "Login" }];
    };

    const navLinks = getNavLinks();

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-lg">
            <nav className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center"
                        aria-label="Go to homepage"
                        onClick={closeMenu}
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

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 sm:hidden"
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

                    <div className="hidden items-center space-x-6 text-lg sm:flex">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={`transition-colors ${pathname === link.href ? 'text-purple-400' : 'hover:text-zinc-300'}`}>
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <button onClick={handleLogout} className="hover:text-zinc-300 transition-colors">Logout</button>
                        )}
                    </div>
                </div>

                {isMenuOpen && (
                    <div id="mobile-nav" className="mt-3 flex flex-col gap-3 border-t border-zinc-700 pt-3 sm:hidden">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={`rounded-md px-2 py-2 text-base ${pathname === link.href ? 'bg-zinc-800 text-purple-400' : 'hover:bg-zinc-800'}`} onClick={closeMenu}>
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <button onClick={() => { handleLogout(); closeMenu(); }} className="rounded-md px-2 py-2 text-base text-left hover:bg-zinc-800">Logout</button>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
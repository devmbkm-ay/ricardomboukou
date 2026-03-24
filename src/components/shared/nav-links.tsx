"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button"; // We'll create this
import LanguageSwitcher from "./language-switcher";

type NavLink = {
    href: string;
    label: string;
};

type Dictionary = {
    home: string;
    about: string;
    projects: string;
    contact: string;
    dashboard: string;
    login: string;
    logout: string;
};

export default function NavLinks({ lang, dictionary, isAuthenticated }: { lang: string, dictionary: Dictionary, isAuthenticated: boolean }) {
    const pathname = usePathname();

    const baseNavLinks: NavLink[] = [
        { href: `/${lang}`, label: dictionary.home },
        { href: `/${lang}/about`, label: dictionary.about },
        { href: `/${lang}/projects`, label: dictionary.projects },
        { href: `/${lang}/contact`, label: dictionary.contact }
    ];

    const navLinks = isAuthenticated
        ? [...baseNavLinks, { href: `/${lang}/admin/dashboard`, label: dictionary.dashboard }]
        : [...baseNavLinks, { href: `/${lang}/auth/login`, label: dictionary.login }];

    return (
        <>
            {navLinks.map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`transition-colors ${pathname === link.href ? 'text-purple-400' : 'hover:text-zinc-300'}`}
                >
                    {link.label}
                </Link>
            ))}
            {isAuthenticated && <LogoutButton dictionary={dictionary} />}
            <div className="h-6 w-px bg-zinc-700 mx-3"></div>
            <LanguageSwitcher />
        </>
    );
}

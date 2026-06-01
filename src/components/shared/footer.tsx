'use client';

import Link from 'next/link';
import { Logo } from './logo';

interface FooterDictionary {
    [key: string]: string;
}

interface FooterProps {
    lang: string;
    dictionary?: FooterDictionary;
}

const Footer: React.FC<FooterProps> = ({ lang, dictionary = {} }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm dark:bg-background/30">
            <div className="container mx-auto px-4 py-12 sm:py-16">
                {/* Main footer content */}
                <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
                    {/* Logo with animation */}
                    <Link
                        href={`/${lang}`}
                        className="group inline-block transition-opacity hover:opacity-80"
                        aria-label="Go to homepage"
                    >
                        <div className="logo-animate">
                            <Logo variant="mark" className="h-12 mx-auto" />
                        </div>
                    </Link>

                    {/* Brand name */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight">Ricardo M&apos;Boukou</h3>
                        <p className="text-sm text-muted">
                            Web Developer · Digital Marketing · AI
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="pt-4 border-t border-border/50 w-full">
                        <p className="text-xs text-muted">
                            © {currentYear} Ricardo M&apos;Boukou. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

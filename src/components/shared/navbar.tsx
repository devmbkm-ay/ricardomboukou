"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-zinc-900 text-white px-4 py-3">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Go to homepage"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo-2.png"
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
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <div className="hidden items-center space-x-6 text-lg sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-zinc-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="mt-3 flex flex-col gap-3 border-t border-zinc-700 pt-3 sm:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-base hover:bg-zinc-800"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

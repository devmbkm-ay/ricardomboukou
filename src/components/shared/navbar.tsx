import Link from "next/link";
import Image from "next/image";


const Navbar = () => {
  return (
    <header className="bg-zinc-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
          <Image
            src="/images/logo.png"
            alt="MBK logo"
            width={140}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="sr-only">MBK</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-zinc-300 transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-zinc-300 transition-colors">
            Projects
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

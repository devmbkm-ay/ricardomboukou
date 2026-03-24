"use client";

import { useParams, useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import type { Locale } from '@/i18n.config';

export default function LogoutButton({ dictionary }: { dictionary: { logout: string } }) {
    const router = useRouter();
    const params = useParams<{ lang: Locale }>();
    const lang = params?.lang ?? 'en';

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            toast.success("You have been logged out.");
            router.push(`/${lang}`);
            router.refresh(); // Forces a refresh to update server components
        } catch (error) {
            console.error('Failed to logout', error);
            toast.error("Logout failed.");
        }
    };

    return (
        <button onClick={handleLogout} className="hover:text-zinc-300 transition-colors">
            {dictionary.logout}
        </button>
    );
}

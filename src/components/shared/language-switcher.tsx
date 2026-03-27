"use client"

import { usePathname, useRouter } from 'next/navigation'
import { i18n } from '@/i18n.config'

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = (locale: string) => {
    if (!pathName || pathName === '/') return `/${locale}`

    const segments = pathName.split('/')
    if (i18n.locales.includes(segments[1] as (typeof i18n.locales)[number])) {
      segments[1] = locale
      return segments.join('/')
    }

    return `/${locale}${pathName}`
  }

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => router.push(redirectedPathName('en'))} 
        className={`text-sm font-medium transition-colors ${pathName?.startsWith('/en') ? 'text-primary' : 'text-muted hover:text-foreground'}`}
      >
        EN
      </button>
      <div className="h-4 w-px bg-border"></div>
      <button 
        onClick={() => router.push(redirectedPathName('fr'))} 
        className={`text-sm font-medium transition-colors ${pathName?.startsWith('/fr') ? 'text-primary' : 'text-muted hover:text-foreground'}`}
      >
        FR
      </button>
    </div>
  )
}

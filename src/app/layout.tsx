import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
import Navbar from '@/components/shared/navbar'
import './globals.css'

const interFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ricardo\'s Portfolio',
  description: 'A showcase of my projects and skills as a software developer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
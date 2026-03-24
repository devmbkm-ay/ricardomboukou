import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Ricardo\'s Portfolio',
  description: 'A showcase of my projects and skills as a software developer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Toaster />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NAEAP Academic Journal - Premier Research Publication',
  description: 'Advancing knowledge through rigorous research and scholarly excellence. Discover groundbreaking studies from leading academics worldwide.',
  keywords: 'academic journal, research, scholarly publication, peer review, NEAP',
  authors: [{ name: 'NAEAP Editorial Team' }],
  creator: 'NAEAP Academic Journal',
  publisher: 'NAEAP Academic Journal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
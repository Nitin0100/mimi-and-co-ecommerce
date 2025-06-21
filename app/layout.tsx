import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MIMI & CO - Adorable Fashion for 0-5 Year Olds',
  description: 'Discover the cutest and most comfortable fashion for your little ones. MIMI & CO offers adorable clothing for children aged 0-5 years with soft pastel themes and playful designs.',
  keywords: 'kids fashion, baby clothes, toddler clothing, children fashion, MIMI & CO',
  authors: [{ name: 'MIMI & CO' }],
  metadataBase: new URL('https://mimi-and-co-ecommerce.vercel.app'),
  openGraph: {
    title: 'MIMI & CO - Adorable Fashion for 0-5 Year Olds',
    description: 'Discover the cutest and most comfortable fashion for your little ones.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 
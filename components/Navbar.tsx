'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

const Navbar = () => {
  const { state: cartState } = useCart()
  const { state: authState, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-display font-bold text-brand-primary"
              >
                MIMI & CO
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side - Cart and Auth */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link href="/cart" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors duration-200"
                >
                  <ShoppingCart className="w-6 h-6 text-brand-primary" />
                  {cartState.itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cartState.itemCount}
                    </motion.div>
                  )}
                </motion.div>
              </Link>

              {/* Auth Button */}
              {authState.isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Hi, {authState.user?.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign In
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2 border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                Cart ({cartState.itemCount})
              </Link>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}

export default Navbar 
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { formatPrice } from '@/lib/utils'

const CartPage = () => {
  const { state: cartState, updateQuantity, removeItem } = useCart()
  const { state: authState } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }
    // Navigate to checkout page
    window.location.href = '/checkout'
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🛍️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any adorable items to your cart yet. 
              Let's find something special for your little one!
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartState.itemCount} item{cartState.itemCount !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Cart Items</h2>
              
              <AnimatePresence>
                {cartState.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-pastel-pink/20 to-pastel-mint/20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Age: {item.ageGroup} • {item.gender}
                      </p>
                      <div className="text-lg font-bold text-brand-primary">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <span className="w-8 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartState.itemCount} items)</span>
                  <span>{formatPrice(cartState.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(cartState.total * 0.08)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(cartState.total * 1.08)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {authState.isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </motion.button>

              {!authState.isAuthenticated && (
                <p className="text-sm text-gray-500 text-center mt-3">
                  Sign in to save your cart and checkout
                </p>
              )}

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-secondary py-3 mt-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}

export default CartPage 
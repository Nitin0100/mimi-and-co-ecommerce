'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CreditCard, Truck, CheckCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'
import { formatPrice } from '@/lib/utils'

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  saveAddress: boolean
}

const CheckoutPage = () => {
  const { state: cartState, clearCart } = useCart()
  const { state: authState } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutForm>()

  const subtotal = cartState.total
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const onSubmit = async (data: CheckoutForm) => {
    if (!authState.isAuthenticated) {
      toast.error('Please sign in to complete your order')
      return
    }

    if (cartState.items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock order creation
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartState.items,
        total,
        customer: data,
        paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }

      console.log('Order placed:', order)
      
      // Clear cart
      clearCart()
      
      // Show success
      setOrderPlaced(true)
      toast.success('Order placed successfully! 🎉')
      
    } catch (error) {
      console.error('Order error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-8">
              Please sign in to complete your checkout
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before checkout
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for your order! We'll send you a confirmation email with tracking details.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Billing Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    {...register('zipCode', { required: 'ZIP code is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your ZIP code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('saveAddress')}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="text-sm text-gray-600">Save this address for future orders</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-2xl hover:border-brand-primary cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-brand-primary focus:ring-brand-primary"
                  />
                  <Truck className="w-6 h-6 text-brand-primary" />
                  <div>
                    <div className="font-medium text-gray-800">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-2xl hover:border-brand-primary cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-brand-primary focus:ring-brand-primary"
                  />
                  <CreditCard className="w-6 h-6 text-brand-primary" />
                  <div>
                    <div className="font-medium text-gray-800">UPI Payment</div>
                    <div className="text-sm text-gray-600">Pay using UPI (Coming Soon)</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pastel-pink/20 to-pastel-mint/20 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isProcessing}
                className="w-full btn-primary py-4 text-lg font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutPage 
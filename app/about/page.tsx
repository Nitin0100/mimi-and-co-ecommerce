'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About MIMI & CO
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making childhood magical with adorable, comfortable, and stylish fashion 
              for your little ones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">👶</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                MIMI & CO was born from a simple belief: every child deserves to feel 
                comfortable, confident, and absolutely adorable in their clothes. We 
                started with a dream to create fashion that parents love and kids 
                can't wait to wear.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We're dedicated to creating high-quality, comfortable, and stylish 
                clothing for children aged 0-5 years. Every piece is designed with 
                love, care, and attention to detail that parents can trust.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Why Choose MIMI & CO?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">
                  Soft, durable fabrics that are gentle on sensitive skin
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Playful Designs</h3>
                <p className="text-gray-600 text-sm">
                  Colorful, fun patterns that spark imagination and joy
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💝</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Perfect Fit</h3>
                <p className="text-gray-600 text-sm">
                  Designed specifically for growing bodies and active lifestyles
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Join Our Family
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're more than just a clothing brand - we're a community of parents 
              who believe in making childhood magical. Join us in creating beautiful 
              memories, one adorable outfit at a time.
            </p>
            <div className="text-6xl mb-4">✨</div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default AboutPage 
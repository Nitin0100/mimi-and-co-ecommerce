'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary/10 via-pastel-peach/20 to-brand-secondary/10 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-pastel-yellow/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-pastel-mint/40 rounded-full blur-lg"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-16 h-16 bg-pastel-pink/40 rounded-full blur-lg"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            >
              Adorable Fashion for{' '}
              <span className="text-brand-primary">0-5 Year Olds</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Discover the cutest and most comfortable clothing for your little ones. 
              Soft pastel themes, playful designs, and premium quality materials.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Shop Now 🛍️
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More ✨
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-sm font-medium text-gray-700">Premium Quality</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <p className="text-sm font-medium text-gray-700">Playful Designs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💝</div>
                <p className="text-sm font-medium text-gray-700">Comfortable Fit</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-pastel-pink/20 to-pastel-mint/20 rounded-3xl overflow-hidden">
              {/* Animated characters */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 text-6xl"
              >
                👶
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 text-5xl"
              >
                🧸
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-20 text-4xl"
              >
                🌈
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 text-5xl"
              >
                ⭐
              </motion.div>
              
              {/* Central illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-8xl lg:text-9xl"
                >
                  👕
                </motion.div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 text-2xl"
            >
              🎀
            </motion.div>
            <motion.div
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 text-2xl"
            >
              🧦
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative h-64 bg-gradient-to-br from-pastel-pink/20 to-pastel-mint/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">
                  {product.ageGroup}
                </span>
                {product.gender !== 'unisex' && (
                  <span className="inline-block px-2 py-1 bg-brand-secondary/10 text-brand-secondary text-xs font-medium rounded-full ml-2">
                    {product.gender}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-brand-primary">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

export default ProductGrid 
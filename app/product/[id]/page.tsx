'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Zap, ArrowLeft, Star } from 'lucide-react'

import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import { mockProducts } from '@/data/products'

import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'

const ProductDetailPage = () => {
  const params = useParams()
  const { id } = params
  const { addItem } = useCart()

  const product = mockProducts.find(p => p.id === id)

  const similarProducts = product
    ? mockProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3)
    : []

  const handleBuyNow = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        ageGroup: product.ageGroup,
        gender: product.gender,
      });
      window.location.href = '/checkout';
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        ageGroup: product.ageGroup,
        gender: product.gender,
      });
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link href="/" className="mt-4 inline-block btn-primary">Go back to shop</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-beige via-white to-pastel-mint">
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/" className="flex items-center text-gray-600 hover:text-brand-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all products
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="bg-white rounded-3xl shadow-lg p-4">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="flex flex-col h-full">
                <span className="inline-block px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-sm font-medium rounded-full self-start mb-3">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 text-gray-300 fill-current" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(12 reviews)</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                
                <div className="text-4xl font-bold text-brand-primary mb-8">
                  {formatPrice(product.price)}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex-grow text-lg px-8 py-4 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex-grow text-lg px-8 py-4 flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    Buy Now
                  </motion.button>
                </div>

                <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">
                  <p><span className="font-semibold">Age Group:</span> {product.ageGroup}</p>
                  <p><span className="font-semibold">Gender:</span> {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</p>
                  <p><span className="font-semibold">Availability:</span> {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {similarProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">You Might Also Like</h2>
            <ProductGrid products={similarProducts} />
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage 
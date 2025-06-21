'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import FilterBar from '@/components/FilterBar'
import Footer from '@/components/Footer'
import { Product } from '@/types/product'
import { mockProducts } from '@/data/products'

interface FilterState {
  age: [number, number]
  price: [number, number]
  gender: string[]
  category: string[]
}

const ageGroupToYears = (ageGroup: string): [number, number] => {
  if (ageGroup === '0-1Y') return [0, 1]
  if (ageGroup === '1-3Y') return [1, 3]
  if (ageGroup === '3-5Y') return [3, 5]
  return [0, 5]
}

export default function Home() {
  const [products] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [filters, setFilters] = useState<FilterState>({
    age: [0, 5],
    price: [0, 5000],
    gender: [],
    category: [],
  })

  // Apply filters
  useEffect(() => {
    let filtered = products

    // Age filter
    const [minAge, maxAge] = filters.age
    filtered = filtered.filter(product => {
      const [productMinAge, productMaxAge] = ageGroupToYears(product.ageGroup)
      return productMaxAge >= minAge && productMinAge <= maxAge
    })

    // Price filter
    const [minPrice, maxPrice] = filters.price
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice)

    // Gender filter
    if (filters.gender.length > 0) {
      filtered = filtered.filter(product => filters.gender.includes(product.gender))
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category))
    }

    setFilteredProducts(filtered)
  }, [products, filters])

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      age: [0, 5],
      price: [0, 5000],
      gender: [],
      category: [],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 via-pastel-beige to-brand-secondary/10">
      
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
          <motion.aside 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/4 lg:sticky top-24 h-fit"
          >
            <FilterBar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              products={products}
            />
          </motion.aside>
          
          <section className="w-full lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left mb-4">
                Adorable Fashion for Your Little Ones
              </h2>
              <p className="text-gray-600 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                Discover our collection of comfortable, stylish, and adorable clothing 
                designed specifically for children aged 0-5 years.
              </p>
            </motion.div>
            
            <ProductGrid products={filteredProducts} />
            
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to see more products
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 
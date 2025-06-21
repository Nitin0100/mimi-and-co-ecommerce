'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types/product'

interface FilterBarProps {
  filters: {
    age: [number, number]
    price: [number, number]
    gender: string[]
    category: string[]
  }
  onFilterChange: (filterType: string, value: any) => void
  onClearFilters: () => void
  products: Product[]
}

const FilterBar = ({ filters, onFilterChange, onClearFilters, products }: FilterBarProps) => {
  const genders = ['boy', 'girl', 'unisex']
  const categories = ['onesies', 'dresses', 'tshirts', 'pajamas', 'overalls', 'outerwear']

  const hasActiveFilters = 
    filters.age[0] !== 0 || filters.age[1] !== 5 ||
    filters.price[0] !== 0 || filters.price[1] !== 5000 ||
    filters.gender.length > 0 ||
    filters.category.length > 0

  const handleCheckboxChange = (filterType: 'gender' | 'category', value: string) => {
    const currentValues = filters[filterType]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    onFilterChange(filterType, newValues)
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-brand-primary"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {/* Age Range Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Age Range: {filters.age[0]} - {filters.age[1]} years
          </label>
          <Slider
            range
            min={0}
            max={5}
            step={1}
            value={filters.age}
            onChange={(value) => onFilterChange('age', value as [number, number])}
            trackStyle={{ backgroundColor: '#ff9ecd' }}
            handleStyle={{
              borderColor: '#ff9ecd',
              backgroundColor: '#ff9ecd',
              opacity: 1,
            }}
          />
        </div>

        {/* Price Range Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Price Range: {formatPrice(filters.price[0])} - {formatPrice(filters.price[1])}
          </label>
          <Slider
            range
            min={0}
            max={5000}
            step={100}
            value={filters.price}
            onChange={(value) => onFilterChange('price', value as [number, number])}
            trackStyle={{ backgroundColor: '#ff9ecd' }}
            handleStyle={{
              borderColor: '#ff9ecd',
              backgroundColor: '#ff9ecd',
              opacity: 1,
            }}
          />
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <div className="space-y-2">
            {genders.map((gender) => (
              <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.gender.includes(gender)}
                  onChange={() => handleCheckboxChange('gender', gender)}
                  className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="capitalize">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleCheckboxChange('category', category)}
                  className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar 
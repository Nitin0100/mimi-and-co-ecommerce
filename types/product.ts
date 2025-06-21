export interface Product {
  id: string
  name: string
  price: number
  image: string
  ageGroup: '0-1Y' | '1-3Y' | '3-5Y'
  gender: 'boy' | 'girl' | 'unisex'
  description: string
  category: string
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  rating?: number
  reviews?: number
} 
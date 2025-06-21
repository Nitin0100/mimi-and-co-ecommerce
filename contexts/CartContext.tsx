'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  ageGroup: string
  gender?: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: newItemCount,
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return {
          ...state,
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)
      
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    case 'CLEAR_CART':
      return initialState
    
    case 'LOAD_CART': {
      const newTotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: action.payload,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mimi-cart')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: 'LOAD_CART', payload: parsedCart })
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mimi-cart', JSON.stringify(state.items))
    }
  }, [state.items])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })
    toast.success(`${item.name} added to cart!`, {
      icon: '🛍️',
      style: {
        borderRadius: '16px',
        background: '#fff',
        color: '#333',
      },
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    toast.success('Item removed from cart!', {
      icon: '🗑️',
      style: {
        borderRadius: '16px',
        background: '#fff',
        color: '#333',
      },
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast.success('Cart cleared!', {
      icon: '✨',
      style: {
        borderRadius: '16px',
        background: '#fff',
        color: '#333',
      },
    })
  }

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
} 
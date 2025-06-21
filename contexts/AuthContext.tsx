'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const user = await response.json()
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const user = await response.json()
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        toast.success('Welcome back! 👋', {
          icon: '🎉',
          style: {
            borderRadius: '16px',
            background: '#fff',
            color: '#333',
          },
        })
        return true
      } else {
        const error = await response.json()
        toast.error(error.message || 'Login failed', {
          icon: '❌',
          style: {
            borderRadius: '16px',
            background: '#fff',
            color: '#333',
          },
        })
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.', {
        icon: '❌',
        style: {
          borderRadius: '16px',
          background: '#fff',
          color: '#333',
        },
      })
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        const user = await response.json()
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        toast.success('Welcome to MIMI & CO! 🎉', {
          icon: '✨',
          style: {
            borderRadius: '16px',
            background: '#fff',
            color: '#333',
          },
        })
        return true
      } else {
        const error = await response.json()
        toast.error(error.message || 'Signup failed', {
          icon: '❌',
          style: {
            borderRadius: '16px',
            background: '#fff',
            color: '#333',
          },
        })
        return false
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Signup failed. Please try again.', {
        icon: '❌',
        style: {
          borderRadius: '16px',
          background: '#fff',
          color: '#333',
        },
      })
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      toast.success('See you soon! 👋', {
        icon: '💫',
        style: {
          borderRadius: '16px',
          background: '#fff',
          color: '#333',
        },
      })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value = {
    state,
    login,
    signup,
    logout,
    checkAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'moderator'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('adminAuth')
        if (authData) {
          const parsed = JSON.parse(authData)
          if (parsed.isAuthenticated && parsed.expiresAt > Date.now()) {
            setUser(parsed.user)
          } else {
            // Clear expired auth
            localStorage.removeItem('adminAuth')
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        localStorage.removeItem('adminAuth')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Basic validation (in production, this would be a real API call)
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        }
        
        const authData = {
          isAuthenticated: true,
          user: userData,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }
        
        localStorage.setItem('adminAuth', JSON.stringify(authData))
        setUser(userData)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

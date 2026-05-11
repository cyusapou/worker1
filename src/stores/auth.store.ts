import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'user' | 'admin' | 'worker' | 'client'
  avatar?: string
  memberSince?: string
  lastLogin?: string
  unreadMessagesCount?: number
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref('')

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = ''

    try {
      // In a real app, we'd send email/password to /api/login
      // For this bridge, we'll use the check-me logic or a simplified login
      const response = await fetch(`${API_BASE}/api/users/me?email=${encodeURIComponent(email)}`)
      
      if (response.ok) {
        const data = await response.json()
        user.value = {
          ...data,
          lastLogin: new Date().toISOString()
        }
        localStorage.setItem('agruni_user', JSON.stringify(user.value))
        return true
      } else {
        error.value = 'User not found. Try john.doe@example.com (if you registered it)'
        return false
      }
    } catch (err) {
      error.value = 'Login failed'
      console.error('Login error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      user.value = null
      localStorage.removeItem('agruni_user')
      return true
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user.value) return false
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE}/api/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.value.email, ...updates })
      })
      if (response.ok) {
        const data = await response.json()
        user.value = { ...user.value, ...data }
        localStorage.setItem('agruni_user', JSON.stringify(user.value))
        return true
      }
      return false
    } catch (err) {
      console.error('Profile update error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem('agruni_user')
      if (stored) {
        user.value = JSON.parse(stored)
      }
    } catch (err) {
      localStorage.removeItem('agruni_user')
    }
  }

  const isAuthenticated = () => !!user.value
  const hasRole = (role: string) => user.value?.role === role

  const init = () => {
    checkAuth()
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
    checkAuth,
    init,
    isAuthenticated,
    hasRole
  }
})

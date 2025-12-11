import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null)
  const token = ref<string | null>(localStorage.getItem("token"))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
      })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem("token", token.value)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || "Registration failed"
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem("token", token.value)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || "Login failed"
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem("token")
  }

  const getMe = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      user.value = response.data
      return response.data
    } catch (err) {
      logout()
      throw err
    }
  }

  return {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    getMe,
  }
})

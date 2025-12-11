import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"
import { useAuthStore } from "./auth"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

export const useMetaStore = defineStore("meta", () => {
  const authStore = useAuthStore()

  const accounts = ref<any[]>([])
  const selectedAccount = ref<any>(null)
  const apps = ref<any[]>([])
  const wabas = ref<any[]>([])
  const phones = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const headers = computed(() => ({
    Authorization: `Bearer ${authStore.token}`,
  }))

  const fetchBusinessAccounts = async () => {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/meta/business`, { headers: headers.value })
      accounts.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || "Failed to fetch accounts"
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchApps = async (metaAccountId: string) => {
    try {
      const response = await axios.get(`${API_URL}/meta/apps?metaAccountId=${metaAccountId}`, {
        headers: headers.value,
      })
      apps.value = response.data
      return response.data
    } catch (err) {
      throw err
    }
  }

  const fetchWabas = async (metaAccountId: string) => {
    try {
      const response = await axios.get(`${API_URL}/meta/waba?metaAccountId=${metaAccountId}`, {
        headers: headers.value,
      })
      wabas.value = response.data
      return response.data
    } catch (err) {
      throw err
    }
  }

  const fetchPhones = async (wabaId: string) => {
    try {
      const response = await axios.get(`${API_URL}/meta/phones?wabaId=${wabaId}`, { headers: headers.value })
      phones.value = response.data
      return response.data
    } catch (err) {
      throw err
    }
  }

  const selectAccount = (account: any) => {
    selectedAccount.value = account
  }

  return {
    accounts,
    selectedAccount,
    apps,
    wabas,
    phones,
    loading,
    error,
    fetchBusinessAccounts,
    fetchApps,
    fetchWabas,
    fetchPhones,
    selectAccount,
  }
})

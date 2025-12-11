<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">WhatsApp Admin</h1>
        <p class="text-gray-600 mt-2">Criar Conta</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
          <input
            v-model="formData.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="state.loading"
          class="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {{ state.loading ? 'Carregando...' : 'Registrar' }}
        </button>
      </form>

      <p class="text-center text-gray-600 mt-6">
        Já tem conta?
        <RouterLink to="/login" class="text-green-600 hover:text-green-700 font-semibold">
          Faça login
        </RouterLink>
      </p>

      <div v-if="state.error" class="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
        {{ state.error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const formData = reactive({
      name: '',
      email: '',
      password: '',
    })

    const state = reactive({
      loading: false,
      error: '',
    })

    const handleRegister = async () => {
      state.loading = true
      state.error = ''
      try {
        await authStore.register(formData.email, formData.password, formData.name)
        await router.push('/')
      } catch (err: any) {
        state.error = err.response?.data?.error || 'Erro ao registrar'
      } finally {
        state.loading = false
      }
    }

    return {
      formData,
      state,
      handleRegister,
    }
  },
})
</script>

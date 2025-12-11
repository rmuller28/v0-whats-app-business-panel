<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <div v-if="loading" class="space-y-4">
        <div class="text-2xl">⏳</div>
        <h1 class="text-2xl font-bold text-gray-900">Processando autenticação...</h1>
        <p class="text-gray-600">Por favor, aguarde enquanto conectamos sua conta Meta</p>
      </div>

      <div v-else-if="error" class="space-y-4">
        <div class="text-2xl">❌</div>
        <h1 class="text-2xl font-bold text-red-600">Erro na autenticação</h1>
        <p class="text-gray-600">{{ error }}</p>
        <RouterLink to="/accounts" class="block mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
          Voltar
        </RouterLink>
      </div>

      <div v-else class="space-y-4">
        <div class="text-2xl">✅</div>
        <h1 class="text-2xl font-bold text-green-600">Conta conectada com sucesso!</h1>
        <p class="text-gray-600">Redirecionando para contas...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')

  if (!code) {
    error.value = 'Código de autorização não encontrado'
    loading.value = false
    return
  }

  try {
    // Aqui você faria a chamada para o backend para trocar o código por um token
    await new Promise(resolve => setTimeout(resolve, 2000))
    setTimeout(() => router.push('/accounts'), 1500)
  } catch (err) {
    error.value = 'Falha ao conectar a conta'
    loading.value = false
  }
})
</script>

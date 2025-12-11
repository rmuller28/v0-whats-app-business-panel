<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Bem-vindo ao Painel de Gerenciamento WhatsApp Business</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-sm text-gray-600">Contas Conectadas</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.accountCount }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-sm text-gray-600">Templates</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.templateCount }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-sm text-gray-600">Mensagens Enviadas</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.messageCount }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-sm text-gray-600">Webhook Logs</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.logCount }}</div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink
          to="/accounts"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-700">Conectar Conta Meta</span>
          <span class="text-2xl">→</span>
        </RouterLink>
        <RouterLink
          to="/templates"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-700">Gerenciar Templates</span>
          <span class="text-2xl">→</span>
        </RouterLink>
        <RouterLink
          to="/messages"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-700">Enviar Mensagem</span>
          <span class="text-2xl">→</span>
        </RouterLink>
        <RouterLink
          to="/webhook-logs"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-700">Ver Webhook Logs</span>
          <span class="text-2xl">→</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const metaStore = useMetaStore()

    const stats = reactive({
      accountCount: 0,
      templateCount: 0,
      messageCount: 0,
      logCount: 0,
    })

    onMounted(async () => {
      await metaStore.fetchBusinessAccounts()
      stats.accountCount = metaStore.accounts.length
    })

    return {
      stats,
      metaStore,
    }
  },
})
</script>

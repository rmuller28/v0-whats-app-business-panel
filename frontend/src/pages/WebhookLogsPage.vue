<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Webhook Inspector</h1>
        <p class="text-gray-600 mt-1">Logs de eventos e mensagens recebidas</p>
      </div>
      <button
        @click="refreshLogs"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        🔄 Atualizar
      </button>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="border-b p-6 space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por evento</label>
            <select v-model="filterEvent" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Todos</option>
              <option value="messages">Mensagens</option>
              <option value="message_status">Status</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filterStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Todos</option>
              <option value="RECEIVED">Recebido</option>
              <option value="PROCESSED">Processado</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Evento</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ log.event }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ new Date(log.createdAt).toLocaleString('pt-BR') }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    log.status === 'RECEIVED' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ log.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <button @click="expandLog(log.id)" class="text-green-600 hover:text-green-700 font-medium">
                  Ver Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Log Details Modal -->
    <div v-if="selectedLog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-96 overflow-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">Detalhes do Log</h2>
          <button @click="selectedLog = null" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <pre class="bg-gray-50 p-4 rounded-lg text-xs overflow-auto">{{ JSON.stringify(selectedLog.messageData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const logs = ref<any[]>([])
const selectedLog = ref<any>(null)
const filterEvent = ref('')
const filterStatus = ref('')

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const eventMatch = !filterEvent.value || log.event.includes(filterEvent.value)
    const statusMatch = !filterStatus.value || log.status === filterStatus.value
    return eventMatch && statusMatch
  })
})

const refreshLogs = async () => {
  // Fetch logs from API
  console.log('Refreshing logs...')
}

const expandLog = (id: string) => {
  selectedLog.value = logs.value.find(log => log.id === id)
}

onMounted(async () => {
  // Initial fetch
  refreshLogs()
})
</script>

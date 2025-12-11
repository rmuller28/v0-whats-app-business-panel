<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-900 text-white flex flex-col">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-2xl font-bold">WhatsApp Admin</h1>
        <p class="text-xs text-gray-400 mt-1">Business Platform</p>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          :class="{ 'bg-green-600': $route.path === item.path }"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-left"
        >
          <span class="text-xl">🚪</span>
          <span>Sair</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <div class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ $route.meta.title || 'Dashboard' }}</h2>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
            <p class="text-xs text-gray-600">{{ user?.email }}</p>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto p-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/accounts', label: 'Contas Meta', icon: '👤' },
  { path: '/templates', label: 'Templates', icon: '📋' },
  { path: '/messages', label: 'Mensagens', icon: '💬' },
  { path: '/webhook-logs', label: 'Webhook Logs', icon: '📡' },
  { path: '/settings', label: 'Configurações', icon: '⚙️' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

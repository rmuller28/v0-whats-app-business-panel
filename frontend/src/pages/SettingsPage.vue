<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Configurações</h1>
      <p class="text-gray-600 mt-1">Gerencie credenciais e preferências da aplicação</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Credenciais Meta</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">App ID</label>
              <div class="flex items-center gap-2">
                <input
                  type="password"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
                <button class="text-gray-600 hover:text-gray-700">Copiar</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">App Secret</label>
              <div class="flex items-center gap-2">
                <input
                  type="password"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
                <button class="text-gray-600 hover:text-gray-700">Copiar</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Webhook Verify Token</label>
              <div class="flex items-center gap-2">
                <input
                  type="password"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
                <button class="text-gray-600 hover:text-gray-700">Copiar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Webhook URL</h2>
          <div class="space-y-4">
            <p class="text-sm text-gray-600">Configure essa URL nas configurações da sua aplicação Meta:</p>
            <div class="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
              <code class="flex-1 text-sm text-gray-900 break-all">{{ webhookUrl }}</code>
              <button class="text-gray-600 hover:text-gray-700">Copiar</button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Preferências</h2>
          <div class="space-y-4">
            <label class="flex items-center gap-3">
              <input type="checkbox" class="w-5 h-5 rounded" />
              <span class="text-sm text-gray-700">Ativar notificações por email</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" class="w-5 h-5 rounded" />
              <span class="text-sm text-gray-700">Alertas para erros de envio</span>
            </label>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Conta</h2>
          <div class="space-y-2">
            <p class="text-sm">
              <span class="font-semibold text-gray-700">Email:</span>
              <span class="text-gray-600">{{ user?.email }}</span>
            </p>
            <p class="text-sm">
              <span class="font-semibold text-gray-700">Nome:</span>
              <span class="text-gray-600">{{ user?.name }}</span>
            </p>
          </div>
          <button class="w-full mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-semibold">
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const webhookUrl = computed(() => `${window.location.origin}/webhook`)
</script>

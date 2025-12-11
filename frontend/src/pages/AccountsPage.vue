<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Contas Meta</h1>
        <p class="text-gray-600 mt-1">Gerenciar contas e autorizações Facebook/WhatsApp</p>
      </div>
      <button
        @click="startOAuth"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        + Conectar Conta Meta
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="account in metaStore.accounts" :key="account.id" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900">{{ account.businessName }}</h3>
            <p class="text-sm text-gray-600 mt-1">ID: {{ account.businessAccountId }}</p>
          </div>
          <span
            :class="[
              'px-3 py-1 rounded-full text-xs font-semibold',
              account.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ account.verificationStatus }}
          </span>
        </div>

        <div class="mt-6 space-y-2">
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Token:</span> {{ account.accessToken.substring(0, 20) }}...
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-semibold">Data:</span> {{ new Date(account.createdAt).toLocaleDateString('pt-BR') }}
          </p>
        </div>

        <div class="mt-6 space-y-2">
          <button @click="selectAndFetchWabas(account)" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-sm font-semibold">
            Selecionar Conta
          </button>
          <button class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg transition text-sm font-semibold">
            Desconectar
          </button>
        </div>
      </div>
    </div>

    <!-- WABA Selection -->
    <div v-if="metaStore.selectedAccount" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">WhatsApp Business Accounts (WABA)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="waba in metaStore.wabas" :key="waba.id" class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900">{{ waba.displayName }}</h3>
          <p class="text-xs text-gray-600 mt-1">{{ waba.wabaId }}</p>
          <button
            @click="selectAndFetchPhones(waba)"
            class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-sm font-semibold"
          >
            Selecionar
          </button>
        </div>
      </div>
    </div>

    <!-- Phone Management -->
    <div v-if="metaStore.phones.length > 0" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Números de Telefone</h2>
      <div class="space-y-3">
        <div v-for="phone in metaStore.phones" :key="phone.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="font-semibold text-gray-900">{{ phone.phoneNumber }}</p>
              <p class="text-sm text-gray-600">{{ phone.displayName }}</p>
              <p class="text-xs text-gray-500 mt-2">Status: {{ phone.verificationStatus }}</p>
            </div>
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                phone.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ phone.verificationStatus }}
            </span>
          </div>
          <button class="mt-4 text-green-600 hover:text-green-700 text-sm font-semibold">
            Gerenciar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'
import { useAuthStore } from '../stores/auth'

const metaStore = useMetaStore()
const authStore = useAuthStore()

const startOAuth = () => {
  // Implementar fluxo OAuth
  console.log('OAuth flow would be started here')
}

const selectAndFetchWabas = async (account: any) => {
  metaStore.selectAccount(account)
  await metaStore.fetchWabas(account.id)
}

const selectAndFetchPhones = async (waba: any) => {
  await metaStore.fetchPhones(waba.id)
}

onMounted(async () => {
  await metaStore.fetchBusinessAccounts()
})
</script>

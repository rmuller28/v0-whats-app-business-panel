<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Templates</h1>
        <p class="text-gray-600 mt-1">Gerenciamento de Mensagens Template (HSM)</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        + Novo Template
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Idioma</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="template in templates" :key="template.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-900">{{ template.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ template.language }}</td>
            <td class="px-6 py-4 text-sm">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  template.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ template.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ template.category }}</td>
            <td class="px-6 py-4 text-sm">
              <button class="text-green-600 hover:text-green-700 font-medium mr-4">Editar</button>
              <button class="text-red-600 hover:text-red-700 font-medium">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de criação -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Criar Novo Template</h2>
        
        <form @submit.prevent="createTemplate" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Template</label>
              <input
                v-model="newTemplate.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
              <select
                v-model="newTemplate.language"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="en">Inglês</option>
                <option value="pt_BR">Português (Brasil)</option>
                <option value="es">Espanhol</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
            <textarea
              v-model="newTemplate.content"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <input
                v-model="newTemplate.category"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Header</label>
              <select
                v-model="newTemplate.headerType"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Nenhum</option>
                <option value="TEXT">Texto</option>
                <option value="IMAGE">Imagem</option>
                <option value="VIDEO">Vídeo</option>
              </select>
            </div>
          </div>

          <div class="flex gap-4 justify-end">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Criar Template
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const templates = ref<any[]>([])
const showCreateModal = ref(false)
const newTemplate = ref({
  name: '',
  language: 'pt_BR',
  content: '',
  category: '',
  headerType: ''
})

const createTemplate = async () => {
  // API call would go here
  showCreateModal.value = false
}
</script>

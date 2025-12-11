<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Enviar Mensagens</h1>
      <p class="text-gray-600 mt-1">Envio manual de mensagens via WhatsApp</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 class="text-xl font-bold text-gray-900">Composição de Mensagem</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Conta Meta</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Selecione uma conta</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">WABA</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Selecione um WABA</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Número de Telefone</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Selecione um número</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Mensagem</label>
              <div class="grid grid-cols-2 gap-3">
                <button class="p-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold">Texto</button>
                <button class="p-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600">Imagem</button>
                <button class="p-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600">Áudio</button>
                <button class="p-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600">Vídeo</button>
                <button class="p-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600">Documento</button>
                <button class="p-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600">Template</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Destinatário</label>
              <input
                type="tel"
                placeholder="+55 11 98765-4321"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
              <textarea
                rows="6"
                placeholder="Digite sua mensagem aqui..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              ></textarea>
            </div>

            <button class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Histórico Recente</h3>
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="border-l-4 border-green-600 pl-4 py-2">
              <p class="text-sm font-medium text-gray-900">+55 11 98765-4321</p>
              <p class="text-xs text-gray-600">Texto enviado há 5 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

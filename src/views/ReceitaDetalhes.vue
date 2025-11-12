<template>
  <div class="detalhes-container">
    <div v-if="receitasStore.loading" class="loading">
      Carregando...
    </div>

    <div v-else-if="receita" class="receita-detalhes">
      <div class="header">
        <h1>{{ receita.titulo }}</h1>
        <div class="actions">
          <button @click="handlePrint" class="btn-print">
            🖨️ Imprimir
          </button>
          <router-link
            :to="`/receitas/${receita.id}/editar`"
            class="btn-edit"
          >
            ✏️ Editar
          </router-link>
          <button @click="$router.push('/receitas')" class="btn-back">
            ← Voltar
          </button>
        </div>
      </div>

      <div class="meta-info">
        <span class="categoria">{{ receita.categoria }}</span>
        <span class="dificuldade">{{ receita.dificuldade }}</span>
        <span class="info">⏱️ {{ receita.tempo_preparo }} min</span>
        <span class="info">👥 {{ receita.porcoes }} porções</span>
      </div>

      <div class="content">
        <section class="section">
          <h2>Ingredientes</h2>
          <div class="ingredientes">
            <div
              v-for="(linha, index) in ingredientesLista"
              :key="index"
              class="ingrediente-item"
            >
              {{ linha }}
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Modo de Preparo</h2>
          <div class="modo-preparo">
            {{ receita.modo_preparo }}
          </div>
        </section>
      </div>
    </div>

    <div v-else class="error">
      Receita não encontrada
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReceitasStore } from '../stores/receitas';

const route = useRoute();
const router = useRouter();
const receitasStore = useReceitasStore();

const receita = computed(() => receitasStore.receitaAtual);

const ingredientesLista = computed(() => {
  if (!receita.value?.ingredientes) return [];
  return receita.value.ingredientes
    .split('\n')
    .filter(linha => linha.trim());
});

const handlePrint = async () => {
  try {
    await receitasStore.printReceita(route.params.id);
    window.print();
  } catch (err) {
    alert('Erro ao preparar impressão');
  }
};

onMounted(() => {
  receitasStore.fetchReceitaById(route.params.id);
});
</script>

<style scoped>
.detalhes-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

.receita-detalhes {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 20px;
}

h1 {
  margin: 0;
  color: #333;
  font-size: 32px;
  flex: 1;
}

.actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.btn-print,
.btn-edit,
.btn-back {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  text-decoration: none;
  white-space: nowrap;
}

.btn-print {
  background: #667eea;
  color: #fff;
}

.btn-print:hover {
  background: #5568d3;
}

.btn-edit {
  background: #4caf50;
  color: #fff;
  display: inline-block;
}

.btn-edit:hover {
  background: #45a049;
}

.btn-back {
  background: #f0f0f0;
  color: #333;
}

.btn-back:hover {
  background: #e0e0e0;
}

.meta-info {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.categoria,
.dificuldade {
  background: #667eea;
  color: #fff;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

.dificuldade {
  background: #ff9800;
  text-transform: capitalize;
}

.info {
  color: #666;
  font-size: 16px;
}

.content {
  margin-top: 30px;
}

.section {
  margin-bottom: 40px;
}

.section:last-child {
  margin-bottom: 0;
}

h2 {
  color: #333;
  font-size: 24px;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.ingredientes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingrediente-item {
  padding: 8px 0;
  color: #555;
  font-size: 16px;
  line-height: 1.5;
}

.ingrediente-item::before {
  content: '•';
  color: #667eea;
  font-weight: bold;
  margin-right: 10px;
}

.modo-preparo {
  color: #555;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
}

@media print {
  .actions {
    display: none !important;
  }

  .receita-detalhes {
    box-shadow: none;
  }
}
</style>

<template>
  <div class="receitas-container">
    <div class="header">
      <h1>Minhas Receitas</h1>
      <router-link to="/receitas/nova" class="btn-add">
        + Nova Receita
      </router-link>
    </div>

    <div class="search-box">
      <input
        type="text"
        v-model="searchTerm"
        @input="handleSearch"
        placeholder="Buscar receitas..."
      />
    </div>

    <div v-if="receitasStore.loading" class="loading">
      Carregando...
    </div>

    <div v-else-if="receitasStore.receitas.length === 0" class="empty">
      Nenhuma receita encontrada
    </div>

    <div v-else class="receitas-grid">
      <div
        v-for="receita in receitasStore.receitas"
        :key="receita.id"
        class="receita-card"
      >
        <div class="receita-header">
          <h3>{{ receita.titulo }}</h3>
          <span class="categoria">{{ receita.categoria }}</span>
        </div>

        <div class="receita-info">
          <span class="info-item">
            ⏱️ {{ receita.tempo_preparo }} min
          </span>
          <span class="info-item">
            👥 {{ receita.porcoes }} porções
          </span>
          <span class="info-item dificuldade">
            {{ receita.dificuldade }}
          </span>
        </div>

        <div class="receita-actions">
          <router-link
            :to="`/receitas/${receita.id}`"
            class="btn-view"
          >
            Ver
          </router-link>
          <router-link
            :to="`/receitas/${receita.id}/editar`"
            class="btn-edit"
          >
            Editar
          </router-link>
          <button
            @click="handleDelete(receita.id)"
            class="btn-delete"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useReceitasStore } from '../stores/receitas';
import Swal from 'sweetalert2';

const receitasStore = useReceitasStore();
const searchTerm = ref('');
let searchTimeout = null;

const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    receitasStore.fetchReceitas(searchTerm.value);
  }, 500);
};

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Você não poderá reverter esta ação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await receitasStore.deleteReceita(id);
      Swal.fire({
        icon: 'success',
        title: 'Excluída!',
        text: 'Receita excluída com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao excluir receita'
      });
      console.error(err);
    }
  }
};

onMounted(() => {
  receitasStore.fetchReceitas();
});
</script>

<style scoped>
.receitas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  margin: 0;
  color: #333;
}

.btn-add {
  background: #667eea;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #5568d3;
}

.search-box {
  margin-bottom: 30px;
}

.search-box input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.loading,
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

.receitas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.receita-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.receita-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.receita-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.receita-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
  flex: 1;
}

.categoria {
  background: #f0f0f0;
  color: #666;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
  margin-left: 10px;
}

.receita-info {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-item {
  color: #666;
  font-size: 14px;
}

.dificuldade {
  text-transform: capitalize;
}

.receita-actions {
  display: flex;
  gap: 10px;
}

.btn-view,
.btn-edit,
.btn-delete {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-view {
  background: #f0f0f0;
  color: #333;
}

.btn-view:hover {
  background: #e0e0e0;
}

.btn-edit {
  background: #667eea;
  color: #fff;
}

.btn-edit:hover {
  background: #5568d3;
}

.btn-delete {
  background: #ff4444;
  color: #fff;
}

.btn-delete:hover {
  background: #cc0000;
}
</style>

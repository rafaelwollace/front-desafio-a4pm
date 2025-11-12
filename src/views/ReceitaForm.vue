<template>
  <div class="form-container">
    <div class="form-card">
      <h1>{{ isEdit ? 'Editar Receita' : 'Nova Receita' }}</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            v-model="form.titulo"
            required
            placeholder="Ex: Bolo de Chocolate"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="categoria">Categoria</label>
            <input
              type="text"
              id="categoria"
              v-model="form.categoria"
              required
              placeholder="Ex: Sobremesa"
            />
          </div>

          <div class="form-group">
            <label for="dificuldade">Dificuldade</label>
            <select id="dificuldade" v-model="form.dificuldade" required>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="tempo_preparo">Tempo de Preparo (min)</label>
            <input
              type="number"
              id="tempo_preparo"
              v-model.number="form.tempo_preparo"
              required
              min="1"
            />
          </div>

          <div class="form-group">
            <label for="porcoes">Porções</label>
            <input
              type="number"
              id="porcoes"
              v-model.number="form.porcoes"
              required
              min="1"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="ingredientes">Ingredientes</label>
          <textarea
            id="ingredientes"
            v-model="form.ingredientes"
            required
            rows="6"
            placeholder="Liste os ingredientes, um por linha"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="modo_preparo">Modo de Preparo</label>
          <textarea
            id="modo_preparo"
            v-model="form.modo_preparo"
            required
            rows="8"
            placeholder="Descreva o passo a passo do preparo"
          ></textarea>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button
            type="button"
            @click="$router.push('/receitas')"
            class="btn-cancel"
          >
            Cancelar
          </button>
          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReceitasStore } from '../stores/receitas';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const receitasStore = useReceitasStore();

const isEdit = ref(false);
const loading = ref(false);
const error = ref('');

const form = ref({
  titulo: '',
  categoria: '',
  dificuldade: 'facil',
  tempo_preparo: 30,
  porcoes: 4,
  ingredientes: '',
  modo_preparo: '',
});

onMounted(async () => {
  const receitaId = route.params.id;
  if (receitaId) {
    isEdit.value = true;
    loading.value = true;
    try {
      await receitasStore.fetchReceitaById(receitaId);
      if (receitasStore.receitaAtual) {
        form.value = { ...receitasStore.receitaAtual };
      }
    } catch (err) {
      error.value = 'Erro ao carregar receita';
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    // Enviar apenas os campos editáveis
    const data = {
      titulo: form.value.titulo,
      categoria: form.value.categoria,
      dificuldade: form.value.dificuldade,
      tempo_preparo: form.value.tempo_preparo,
      porcoes: form.value.porcoes,
      ingredientes: form.value.ingredientes,
      modo_preparo: form.value.modo_preparo,
    };

    console.log('Dados sendo enviados:', data);

    if (isEdit.value) {
      await receitasStore.updateReceita(route.params.id, data);
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Receita atualizada com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      await receitasStore.createReceita(data);
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Receita cadastrada com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    }
    router.push('/receitas');
  } catch (err) {
    console.error('Erro completo:', err);
    console.error('Resposta do servidor:', err.response?.data);
    error.value = err.response?.data?.message || err.response?.data?.error || 'Erro ao salvar receita';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0 0 30px 0;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
}

textarea {
  resize: vertical;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-cancel,
.btn-submit {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-submit {
  background: #667eea;
  color: #fff;
}

.btn-submit:hover:not(:disabled) {
  background: #5568d3;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<template>
  <div class="receita-card">
    <div class="receita-header">
      <h3>{{ receita.titulo }}</h3>
      <span class="categoria">{{ receita.categoria }}</span>
    </div>

    <div class="receita-info">
      <span class="info-item">⏱️ {{ receita.tempo_preparo }} min</span>
      <span class="info-item">👥 {{ receita.porcoes }} porções</span>
      <span class="info-item dificuldade">{{ receita.dificuldade }}</span>
    </div>

    <div class="receita-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Receita } from '../services/receitasService';

defineProps<{
  receita: Receita;
}>();
</script>

<style scoped>
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
</style>

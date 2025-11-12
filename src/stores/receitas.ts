import { defineStore } from 'pinia';
import { receitasService, type Receita, type ReceitaInput } from '../services/receitasService';

interface ReceitasState {
  receitas: Receita[];
  receitaAtual: Receita | null;
  total: number;
  loading: boolean;
  searchTerm: string;
}

export const useReceitasStore = defineStore('receitas', {
  state: (): ReceitasState => ({
    receitas: [],
    receitaAtual: null,
    total: 0,
    loading: false,
    searchTerm: '',
  }),

  actions: {
    async fetchReceitas(search = '') {
      this.loading = true;
      try {
        const data = await receitasService.getAll(search);
        this.receitas = data.receitas;
        this.total = data.total;
        this.searchTerm = search;
      } finally {
        this.loading = false;
      }
    },

    async fetchReceitaById(id: number) {
      this.loading = true;
      try {
        this.receitaAtual = await receitasService.getById(id);
      } finally {
        this.loading = false;
      }
    },

    async createReceita(receita: ReceitaInput) {
      const data = await receitasService.create(receita);
      await this.fetchReceitas(this.searchTerm);
      return data;
    },

    async updateReceita(id: number, receita: ReceitaInput) {
      const data = await receitasService.update(id, receita);
      await this.fetchReceitas(this.searchTerm);
      return data;
    },

    async deleteReceita(id: number) {
      await receitasService.delete(id);
      await this.fetchReceitas(this.searchTerm);
    },

    async printReceita(id: number) {
      return await receitasService.print(id);
    },

    clearReceitaAtual() {
      this.receitaAtual = null;
    },
  },
});

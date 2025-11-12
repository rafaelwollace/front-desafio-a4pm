import api from './api';

export interface Receita {
  id: number;
  titulo: string;
  ingredientes: string;
  modo_preparo: string;
  tempo_preparo: number;
  porcoes: number;
  categoria: string;
  dificuldade: string;
  usuarioId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReceitaInput {
  titulo: string;
  ingredientes: string;
  modo_preparo: string;
  tempo_preparo: number;
  porcoes: number;
  categoria: string;
  dificuldade: string;
}

interface ReceitasResponse {
  total: number;
  receitas: Receita[];
}

export const receitasService = {
  async getAll(search = ''): Promise<ReceitasResponse> {
    const response = await api.get<ReceitasResponse>('/receitas', {
      params: search ? { search } : {},
    });
    return response.data;
  },

  async getById(id: number): Promise<Receita> {
    const response = await api.get<Receita>(`/receitas/${id}`);
    return response.data;
  },

  async create(receita: ReceitaInput): Promise<Receita> {
    const response = await api.post<Receita>('/receitas', receita);
    return response.data;
  },

  async update(id: number, receita: ReceitaInput): Promise<Receita> {
    const response = await api.put<Receita>(`/receitas/${id}`, receita);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/receitas/${id}`);
  },

  async print(id: number): Promise<Receita> {
    const response = await api.get<Receita>(`/receitas/${id}/print`);
    return response.data;
  },
};

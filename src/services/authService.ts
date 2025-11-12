import api from './api';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  nome: string;
  ativo: boolean;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post<{ user: User }>('/users/register', data);
    return response.data.user;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/profile');
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

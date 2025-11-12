import { defineStore } from 'pinia';
import { authService, type User, type LoginResponse, type RegisterData } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: authService.getUser(),
    isAuthenticated: authService.isAuthenticated(),
  }),

  actions: {
    async login(email: string, senha: string): Promise<LoginResponse> {
      const data = await authService.login(email, senha);
      this.user = data.user;
      this.isAuthenticated = true;
      return data;
    },

    async register(data: RegisterData): Promise<User> {
      return await authService.register(data);
    },

    async logout(): Promise<void> {
      authService.logout();
      this.user = null;
      this.isAuthenticated = false;
    },

    async loadProfile(): Promise<void> {
      if (this.isAuthenticated) {
        const data = await authService.getProfile();
        this.user = data;
      }
    },
  },
});

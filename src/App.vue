<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.nome || '');

const handleLogout = async () => {
  await authStore.logout();
  router.replace('/login');
};
</script>

<template>
  <div id="app">
    <nav v-if="isAuthenticated" class="navbar">
      <div class="nav-content">
        <router-link to="/receitas" class="nav-brand">
          📖 Minhas Receitas
        </router-link>
        <div class="nav-actions">
          <span class="user-name">Olá, {{ userName }}</span>
          <button @click="handleLogout" class="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>

    <main :class="{ 'with-nav': isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-brand:hover {
  color: #5568d3;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-name {
  color: #666;
  font-size: 14px;
}

.btn-logout {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-logout:hover {
  background: #cc0000;
}

main {
  min-height: calc(100vh - 60px);
}

main:not(.with-nav) {
  min-height: 100vh;
}
</style>

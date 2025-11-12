import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/receitas',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/receitas',
      name: 'Receitas',
      component: () => import('../views/Receitas.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/receitas/nova',
      name: 'NovaReceita',
      component: () => import('../views/ReceitaForm.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/receitas/:id/editar',
      name: 'EditarReceita',
      component: () => import('../views/ReceitaForm.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/receitas/:id',
      name: 'ReceitaDetalhes',
      component: () => import('../views/ReceitaDetalhes.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/receitas');
  } else {
    next();
  }
});

export default router;

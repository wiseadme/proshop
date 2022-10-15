import AuthPage from '@shared/pages/AuthPage.vue'
export const authRoutes = [
  {
    path: '/auth',
    redirect: '/auth/login',
    name: 'auth',
  },
  {
    path: '/auth/login/',
    component: AuthPage,
    name: 'login',
  }
]

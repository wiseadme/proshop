import AuthPage from '@shared/pages/AuthPage.vue'
export const authRoutes = [
    {
        path: '',
        redirect: '/auth/login',
        name: 'auth-r',
    },
    {
        path: 'login',
        component: AuthPage,
        name: 'login',
    }
]

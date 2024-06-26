import { RouteNames } from '@shared/enums/route-names'
import AuthPage from '@shared/pages/AuthPage.vue'

export const authRoutes = [
    {
        path: '',
        redirect: '/auth/login',
        name: RouteNames.AUTH,
    },
    {
        path: 'login',
        component: AuthPage,
        name: RouteNames.LOGIN,
    },
]

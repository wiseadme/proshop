import { createRouter, createWebHistory } from 'vue-router'
import { RouteNames } from '@shared/enums/route-names'
import { productRoutes } from '@modules/products/routes'
import { categoryRoutes } from '@modules/categories/routes'
import { attributeRoutes } from '@modules/attributes/routes'
import { unitRoutes } from '@modules/units/routes'
import { variantRoutes } from '@modules/variants/routes'
import { orderRoutes } from '@modules/orders/routes'
import { authRoutes } from '@shared/routes/auth.routes'
import { dashboardRoutes } from '@modules/dashboard/routes'
import { customerRoutes } from '@modules/customers/routes'
import { settingsRoutes } from '@modules/settings/routes'
import { usersRoutes } from '@modules/users/routes'
import { metaTagRoutes } from '@modules/metatags/routes'
import { filterRoutes } from '@modules/filters/routes'
import { networksRoutes } from '@modules/networks/routes'
import { groupsRoutes } from '@modules/groups/routes'
// import { elementRoutes } from '@modules/elements/routes'

const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/admin'

export const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "Main.Page.Proshop" */ '@shared/layouts/MainLayout.vue'),
        name: RouteNames.MAIN,
        children: [
            ...dashboardRoutes,
            ...categoryRoutes,
            ...productRoutes,
            ...attributeRoutes,
            ...unitRoutes,
            ...variantRoutes,
            ...orderRoutes,
            ...customerRoutes,
            ...settingsRoutes,
            ...usersRoutes,
            ...metaTagRoutes,
            ...filterRoutes,
            ...networksRoutes,
            ...groupsRoutes
            // ...elementRoutes
        ],
    },
    {
        path: '/auth',
        component: () => import('@shared/layouts/AuthLayout.vue'),
        name: 'auth',
        children: [
            ...authRoutes,
        ],
    },
]

export const router = createRouter({
    history: createWebHistory(baseUrl),
    routes,
})

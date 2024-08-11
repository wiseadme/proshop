import { createRouter, createWebHistory } from 'vue-router'

import { attributeRoutes } from '@modules/attributes/routes'
import { categoryRoutes } from '@modules/categories/routes'
import { customerRoutes } from '@modules/customers/routes'
import { dashboardRoutes } from '@modules/dashboard/routes'
import { filterRoutes } from '@modules/filters/routes'
import { groupsRoutes } from '@modules/groups/routes'
import { metaTagRoutes } from '@modules/metatags/routes'
import { networksRoutes } from '@modules/networks/routes'
import { orderRoutes } from '@modules/orders/routes'
import { productRoutes } from '@modules/products/routes'
import { settingsRoutes } from '@modules/settings/routes'
import { unitRoutes } from '@modules/units/routes'
import { usersRoutes } from '@modules/users/routes'
import { variantRoutes } from '@modules/variants/routes'
import { RouteNames } from '@shared/enums/route-names'
import { authRoutes } from '@shared/routes/auth.routes'
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

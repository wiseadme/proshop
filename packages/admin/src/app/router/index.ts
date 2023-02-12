import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@modules/product/routes'
import { categoryRoutes } from '@modules/category/routes'
import { attributeRoutes } from '@modules/attribute/routes'
import { unitRoutes } from '@modules/unit/routes'
import { variantRoutes } from '@modules/variant/routes'
import { orderRoutes } from '@modules/order/routes'
import { authRoutes } from '@shared/routes/auth.routes'
import { dashboardRoutes } from '@modules/dashboard/routes'
import { customerRoutes } from '@modules/customer/routes'
import { configRoutes } from '@modules/config/routes'
import { usersRoutes } from '@modules/user/routes'
import { metaTagRoutes } from '@modules/metatag/routes'
// import { elementRoutes } from '@modules/elements/routes'

const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/admin'

export const routes = [
  {
    path: '/',
    component: () => import('@shared/layouts/MainLayout.vue'),
    name: 'main',
    children: [
      ...dashboardRoutes,
      ...categoryRoutes,
      ...productRoutes,
      ...attributeRoutes,
      ...unitRoutes,
      ...variantRoutes,
      ...orderRoutes,
      ...customerRoutes,
      ...configRoutes,
      ...usersRoutes,
      ...metaTagRoutes
      // ...elementRoutes
    ],
  },
  {
    path: '/auth',
    component: () => import('@shared/layouts/AuthLayout.vue'),
    name: 'auth',
    children: [
      ...authRoutes,
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

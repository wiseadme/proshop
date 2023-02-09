import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@modules/products/routes'
import { categoryRoutes } from '@modules/categories/routes'
import { attributeRoutes } from '@modules/attributes/routes'
import { unitRoutes } from '@modules/units/routes'
import { variantRoutes } from '@modules/variants/routes'
import { orderRoutes } from '@modules/orders/routes'
import { authRoutes } from '@shared/routes/auth.routes'
import { dashboardRoutes } from '@modules/dashboard/routes'
import { customerRoutes } from '@modules/customers/routes'
import { configRoutes } from '@modules/config/routes'
import { usersRoutes } from '@modules/users/routes'
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
      ...usersRoutes
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

import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@modules/product/routes'
import { categoryRoutes } from '@modules/category/routes'
import { attributeRoutes } from '@modules/attribute/routes'
import { unitRoutes } from '@modules/unit/routes'
import { variantRoutes } from '@modules/variant/routes'
import { orderRoutes } from '@modules/order/routes'
// import { elementRoutes } from '@modules/elements/routes'

const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/admin'

export const routes = [
  ...categoryRoutes,
  ...productRoutes,
  ...attributeRoutes,
  ...unitRoutes,
  ...variantRoutes,
  ...orderRoutes
  // ...elementRoutes
]

export const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@modules/product/routes'
import { categoryRoutes } from '@modules/category/routes'
import { attributeRoutes } from '@modules/attribute/routes'
import { unitRoutes } from '@modules/unit/routes'

export const routes = [
  ...categoryRoutes,
  ...productRoutes,
  ...attributeRoutes,
  ...unitRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

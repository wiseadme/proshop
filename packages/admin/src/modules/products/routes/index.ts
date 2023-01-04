export const productRoutes = [
  {
    path: '/products',
    component: () => import('@modules/products/layouts/ProductsLayout.vue'),
    name: 'products',
    children: [
      {
        path: '',
        component: () => import('@modules/products/pages/ProductsPage.vue'),
        name: 'products-table',
      },
    ],
  },
]

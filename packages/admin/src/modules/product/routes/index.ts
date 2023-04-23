export const productRoutes = [
  {
    path: '/products',
    component: () => import('@modules/product/layouts/ProductsLayout.vue'),
    name: 'products',
    children: [
      {
        path: '',
        component: () => import('@modules/product/pages/ProductsPage.vue'),
        name: 'products-table',
      },
    ],
  },
]

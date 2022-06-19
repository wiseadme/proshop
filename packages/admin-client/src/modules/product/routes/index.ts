export const productRoutes = [
  {
    path: '/products',
    component: () => import('@modules/product/layouts/ProductLayout.vue'),
    name: 'products',
    children: [
      {
        path: '',
        component: () => import('@modules/product/pages/ProductPage.vue'),
        name: 'products-table',
      },
    ],
  },
]

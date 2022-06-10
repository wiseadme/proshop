export const variantRoutes = [
  {
    path: '/variants',
    component: () => import('@modules/variant/layouts/VariantLayout.vue'),
    name: 'variants',
    children: [
      {
        path: '',
        component: () => import('@modules/variant/pages/VariantPage.vue'),
        name: 'variants-table',
      },
    ],
  },
]

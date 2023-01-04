export const variantRoutes = [
  {
    path: '/variants',
    component: () => import('@modules/variants/layouts/VariantsLayout.vue'),
    name: 'variants',
    children: [
      {
        path: '',
        component: () => import('@modules/variants/pages/VariantsPage.vue'),
        name: 'variants-table',
      },
    ],
  },
]

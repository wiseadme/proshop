export const unitRoutes = [
  {
    path: '/unit',
    component: () => import('@modules/unit/layouts/UnitsLayout.vue'),
    name: 'units',
    children: [
      {
        path: '',
        component: () => import('@modules/unit/pages/UnitsPage.vue'),
        name: 'unit-table',
      },
    ],
  },
]

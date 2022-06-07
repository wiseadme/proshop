export const unitRoutes = [
  {
    path: '/units',
    component: () => import('@modules/unit/layouts/UnitLayout.vue'),
    name: 'units',
    children: [
      {
        path: '',
        component: () => import('@modules/unit/pages/UnitPage.vue'),
        name: 'units-table',
      },
    ],
  },
]

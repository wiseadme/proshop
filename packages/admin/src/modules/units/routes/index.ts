export const unitRoutes = [
  {
    path: '/units',
    component: () => import('@modules/units/layouts/UnitsLayout.vue'),
    name: 'units',
    children: [
      {
        path: '',
        component: () => import('@modules/units/pages/UnitsPage.vue'),
        name: 'units-table',
      },
    ],
  },
]

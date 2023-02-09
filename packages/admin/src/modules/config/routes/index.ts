export const configRoutes = [
  {
    path: '/config',
    component: () => import('@modules/config/layouts/ConfigLayout.vue'),
    name: 'config',
    children: [
      {
        path: '',
        component: () => import('@modules/config/pages/ConfigPage.vue'),
        name: 'config-table',
      },
    ],
  },
]

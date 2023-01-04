export const attributeRoutes = [
  {
    path: '/attributes',
    component: () => import('@modules/attributes/layouts/AttributesLayout.vue'),
    name: 'attributes',
    children: [
      {
        path: '',
        component: () => import('@modules/attributes/pages/AttributesPage.vue'),
        name: 'attributes-table',
      },
    ],
  },
]

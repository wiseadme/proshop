export const attributeRoutes = [
  {
    path: '/attributes',
    component: () => import('@modules/attribute/layouts/AttributeLayout.vue'),
    name: 'attributes',
    children: [
      {
        path: '',
        component: () => import('@modules/attribute/pages/AttributePage.vue'),
        name: 'attributes-table',
      },
    ],
  },
]

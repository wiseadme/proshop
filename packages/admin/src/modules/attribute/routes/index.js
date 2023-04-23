export const attributeRoutes = [
  {
    path: '/attributes',
    component: () => import('@modules/attribute/layouts/AttributesLayout.vue'),
    name: 'attribute',
    children: [
      {
        path: '',
        component: () => import('@modules/attribute/pages/AttributesPage.vue'),
        name: 'attributes-table',
      },
    ],
  },
]

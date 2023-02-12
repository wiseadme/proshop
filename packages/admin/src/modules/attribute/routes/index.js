export const attributeRoutes = [
  {
    path: '/attribute',
    component: () => import('@modules/attribute/layouts/AttributesLayout.vue'),
    name: 'attribute',
    children: [
      {
        path: '',
        component: () => import('@modules/attribute/pages/AttributesPage.vue'),
        name: 'attribute-table',
      },
    ],
  },
]

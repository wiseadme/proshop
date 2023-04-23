export const metaTagRoutes = [
  {
    path: '/metatags',
    component: () => import('@modules/metatag/layouts/MetaTagsLayout.vue'),
    name: 'metatags',
    children: [
      {
        path: '',
        component: () => import('@modules/metatag/pages/MetaTagsPage.vue'),
        name: 'metatags-table'
      }
    ]
  }
]

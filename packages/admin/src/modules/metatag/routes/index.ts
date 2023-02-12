export const metaTagRoutes = [
  {
    path: '/metatag',
    component: () => import('@modules/metatag/layouts/MetaTagsLayout.vue'),
    name: 'metatags',
    children: [
      {
        path: '',
        component: () => import('@modules/metatag/pages/MetaTagsPage.vue'),
        name: 'metatag-table'
      }
    ]
  }
]

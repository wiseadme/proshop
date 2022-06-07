export const categoryRoutes = [
  {
    path: '/categories',
    component: () => import('@modules/category/layouts/CategoryLayout.vue'),
    name: 'categories',
    children: [
      {
        path: '',
        component: () => import('@modules/category/pages/CategoryPage.vue'),
        name: 'categories-table',
      },
    ],
  },
]

export const categoryRoutes = [
  {
    path: '/categories',
    component: () => import('@modules/categories/layouts/CategoriesLayout.vue'),
    name: 'categories',
    children: [
      {
        path: '',
        component: () => import('@modules/categories/pages/CategoriesPage.vue'),
        name: 'categories-table',
      },
    ],
  },
]

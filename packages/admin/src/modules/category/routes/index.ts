export const categoryRoutes = [
  {
    path: '/category',
    component: () => import('@modules/category/layouts/CategoriesLayout.vue'),
    name: 'categories',
    children: [
      {
        path: '',
        component: () => import('@modules/category/pages/CategoriesPage.vue'),
        name: 'category-table',
      },
    ],
  },
]

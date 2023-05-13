export const categoryRoutes = [
    {
        path: '/categories',
        component: () => import('@modules/category/layouts/CategoriesLayout.vue'),
        name: 'categories',
        children: [
            {
                path: '',
                component: () => import('@modules/category/pages/CategoriesPage.vue'),
                name: 'categories-table',
            },
        ],
    },
]

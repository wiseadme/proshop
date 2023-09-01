export const categoryRoutes = [
    {
        path: '/categories',
        component: () => import(/* webpackChunkName: "Page.Proshop" */  '@modules/categories/layouts/CategoriesLayout.vue'),
        name: 'categories',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/categories/pages/CategoriesPage.vue'),
                name: 'categories-table',
            },
        ],
    },
]

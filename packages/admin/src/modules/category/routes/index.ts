export const categoryRoutes = [
    {
        path: '/categories',
        component: () => import(/* webpackChunkName: "Page.Proshop" */  '@modules/category/layouts/CategoriesLayout.vue'),
        name: 'categories',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/category/pages/CategoriesPage.vue'),
                name: 'categories-table',
            },
        ],
    },
]

import { RouteNames } from '@modules/categories/enums/route-names'

export const categoryRoutes = [
    {
        path: '/categories',
        component: () => import(/* webpackChunkName: "Page.CATEGORIES" */  '@modules/categories/layouts/CategoriesLayout.vue'),
        name: 'categories',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.CATEGORIES_TABLE" */ '@modules/categories/pages/CategoriesPage.vue'),
                name: RouteNames.CATEGORIES_TABLE,
            },
        ],
        meta: {
            name: RouteNames.CATEGORIES
        }
    },
]

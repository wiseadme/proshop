import { RouteNames } from '@modules/categories/enums/route-names'

export const categoryRoutes = [
    {
        path: 'categories',
        component: () => import(/* webpackChunkName: "Layout.CATEGORIES" */  '@shared/layouts/PageLayout.vue'),
        name: RouteNames.CATEGORIES,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.CATEGORIES_TABLE" */ '@modules/categories/pages/CategoriesPage.vue'),
                name: RouteNames.CATEGORIES_TABLE,
            },
            {
                path: ':action(edit|create)/:categoryId?/:section',
                components: {
                    default: () => import(/* webpackChunkName: "Page.ProductEditPage" */ '@modules/categories/pages/CategoryEditPage.vue'),
                    right: () => import(/* webpackChunkName: "Page.ProductRightSidebar" */ '@modules/categories/components/CategoryRightSidebar/CategoryRightSidebar.vue'),
                },
                name: RouteNames.CATEGORY_EDIT,
            },
        ],
        meta: {
            name: RouteNames.CATEGORIES,
        },
    },
]

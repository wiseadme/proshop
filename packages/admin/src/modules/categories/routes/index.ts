import { RouteNames } from '@modules/categories/enums/route-names'

export const categoryRoutes = [
    {
        path: 'categories',
        component: () => import(/* webpackChunkName: "Layout.CATEGORIES" */  '@shared/layouts/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* ChunkName: "Page.CATEGORIES_TABLE" */ '@modules/categories/pages/CategoriesPage.vue'),
                name: RouteNames.CATEGORIES,
            },
            {
                path: ':action(edit|create)/:categoryId?/:section',
                components: {
                    default: () => import(/* ChunkName: "Page.CategoryEditPage" */ '@modules/categories/pages/CategoryEditPage.vue'),
                    right: () => import(/* ChunkName: "Page.CategoryRightSidebar" */ '@modules/categories/components/CategoryRightSidebar/CategoryRightSidebar.vue'),
                },
                name: RouteNames.CATEGORY_EDIT,
            },
        ],
        meta: {
            name: RouteNames.CATEGORIES,
        },
    },
]

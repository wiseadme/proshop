import { RouteNames } from '@modules/filters/enums/route-names'

export const filterRoutes = [
    {
        path: '/filter',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/layouts/FiltersLayout.vue'),
        name: RouteNames.FILTER,
        children: [
            {
                path: 'groups',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/pages/FilterGroupsPage.vue'),
                name: RouteNames.FILTER_GROUPS
            },
            {
                path: 'items',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/pages/FilterItemsPage.vue'),
                name: RouteNames.FILTER_ITEMS
            }
        ],
        meta: {
            name: RouteNames.FILTER
        }
    }
]

export const filterRoutes = [
    {
        path: '/filter',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/layouts/FiltersLayout.vue'),
        name: 'filters',
        children: [
            {
                path: 'groups',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/pages/FilterGroupsPage.vue'),
                name: 'filter-groups-page'
            },
            {
                path: 'items',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filters/pages/FilterItemsPage.vue'),
                name: 'filter-items-page'
            }
        ]
    }
]

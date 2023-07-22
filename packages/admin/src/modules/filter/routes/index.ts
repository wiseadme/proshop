export const filterRoutes = [
    {
        path: '/filter',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filter/layouts/FiltersLayout.vue'),
        name: 'filters',
        children: [
            {
                path: 'groups',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filter/pages/FilterGroupsPage.vue'),
                name: 'filter-groups-page'
            },
            {
                path: 'items',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/filter/pages/FilterItemsPage.vue'),
                name: 'filter-items-page'
            }
        ]
    }
]

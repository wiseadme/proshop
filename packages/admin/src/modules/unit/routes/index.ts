export const unitRoutes = [
    {
        path: '/units',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/unit/layouts/UnitsLayout.vue'),
        name: 'units',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/unit/pages/UnitsPage.vue'),
                name: 'units-table',
            },
        ],
    },
]

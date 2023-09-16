export const unitRoutes = [
    {
        path: '/units',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/units/layouts/UnitsLayout.vue'),
        name: 'units',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/units/pages/UnitsPage.vue'),
                name: 'units-table',
            },
        ],
        meta: {
            name: 'units'
        }
    },
]

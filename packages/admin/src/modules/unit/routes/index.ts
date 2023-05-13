export const unitRoutes = [
    {
        path: '/units',
        component: () => import('@modules/unit/layouts/UnitsLayout.vue'),
        name: 'units',
        children: [
            {
                path: '',
                component: () => import('@modules/unit/pages/UnitsPage.vue'),
                name: 'units-table',
            },
        ],
    },
]

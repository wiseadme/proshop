export const networksRoutes = [
    {
        path: '/networks',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/networks/layouts/NetworksLayout.vue'),
        name: 'networks',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/networks/pages/NetworksPage.vue'),
                name: 'networks-table',
            },
        ],
        meta: {
            name: 'networks',
        },
    },
]

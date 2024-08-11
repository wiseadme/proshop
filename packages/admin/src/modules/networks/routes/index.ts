export const networksRoutes = [
    {
        path: 'networks',
        component: () => import(/* webpackChunkName: "Page.NetworksLayout" */ '@modules/networks/layouts/NetworksLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.NetworksPage" */ '@modules/networks/pages/NetworksPage.vue'),
                name: 'networks',
            },
        ],
        meta: {
            name: 'networks',
        },
    },
]

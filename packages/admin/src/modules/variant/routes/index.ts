export const variantRoutes = [
    {
        path: '/variants',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variant/layouts/VariantsLayout.vue'),
        name: 'variants',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variant/pages/VariantsPage.vue'),
                name: 'variant-table',
            },
        ],
    },
]

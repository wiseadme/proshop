export const variantRoutes = [
    {
        path: '/variants',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variants/layouts/VariantsLayout.vue'),
        name: 'variants',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variants/pages/VariantsPage.vue'),
                name: 'variant-table',
            },
        ],
        meta: {
            name: 'variants'
        }
    },
]

export const variantRoutes = [
    {
        path: '/variants',
        component: () => import('@modules/variant/layouts/VariantsLayout.vue'),
        name: 'variants',
        children: [
            {
                path: '',
                component: () => import('@modules/variant/pages/VariantsPage.vue'),
                name: 'variant-table',
            },
        ],
    },
]

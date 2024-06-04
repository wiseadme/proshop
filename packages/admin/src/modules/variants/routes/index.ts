import { RouteNames } from '@modules/variants/enums/route-names'

export const variantRoutes = [
    {
        path: 'variants',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variants/layouts/VariantsLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/variants/pages/VariantsPage.vue'),
                name: RouteNames.VARIANTS,
            },
        ],
        meta: {
            name: RouteNames.VARIANTS,
        }
    },
]

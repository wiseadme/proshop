import { RouteNames } from '@modules/settings/enums/route-names'
export const merchantRoutes = [
    {
        path: 'merchant',
        component: () => import(/* webpackChunkName: "Layout.PAGE" */  '@shared/layouts/PageLayout.vue'),
        name: RouteNames.MERCHANT_SETTINGS,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/pages/MerchantEditPage.vue'),
                name: RouteNames.MERCHANT_SETTINGS,
            }
        ]
    },
]

import { RouteNames } from '@modules/settings/enums/route-names'
export const merchantRoutes = [
    {
        path: 'merchant',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/pages/MerchantPage.vue'),
        name: RouteNames.MERCHANT_SETTINGS
    },
]

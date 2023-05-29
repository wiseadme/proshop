export const merchantRoutes = [
    {
        path: 'merchant',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/pages/MerchantPage.vue'),
        name: 'merchant-settings-page'
    },
    {
        path: 'site',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/pages/SitePage.vue'),
        name: 'site-settings-page'
    }
]

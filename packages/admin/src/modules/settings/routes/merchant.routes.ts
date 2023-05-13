export const merchantRoutes = [
    {
        path: 'merchant',
        component: () => import('@modules/settings/pages/MerchantPage.vue'),
        name: 'merchant-settings-page'
    },
    {
        path: 'site',
        component: () => import('@modules/settings/pages/SitePage.vue'),
        name: 'site-settings-page'
    }
]

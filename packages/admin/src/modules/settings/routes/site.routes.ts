import { RouteNames } from '@modules/settings/enums/route-names'
export const siteRoutes = [
    {
        path: 'site',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/pages/SitePage.vue'),
        name: RouteNames.SITE_SETTINGS
    }
]

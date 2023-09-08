import { merchantRoutes } from './merchant.routes'
import { siteRoutes } from './site.routes'
import { RouteNames } from '@modules/settings/enums/route-names'

export const settingsRoutes = [
    {
        path: 'settings',
        component: () => import(/* webpackChunkName: "Page.SETTINGS" */ '@modules/settings/layouts/SettingsLayout.vue'),
        name: RouteNames.SETTINGS,
        children: [
            ...merchantRoutes,
            ...siteRoutes,
        ],
        meta: {
            name: RouteNames.SETTINGS,
        },
    },
]

import { merchantRoutes } from './merchant.routes'

export const settingsRoutes = [
    {
        path: 'settings',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/settings/layouts/SettingsLayout.vue'),
        name: 'settings',
        children: [
            ...merchantRoutes,
        ],
    },
]

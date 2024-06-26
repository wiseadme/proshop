import { RouteNames } from '@modules/settings/enums/route-names'

import { merchantRoutes } from './merchant.routes'
import { siteRoutes } from './site.routes'

export const settingsRoutes = [
    {
        path: 'settings',
        children: [
            ...merchantRoutes,
            ...siteRoutes,
        ],
        meta: {
            name: RouteNames.SETTINGS,
        },
    },
]

import { currencyRoutes } from './currency.routes'
import { merchantRoutes } from './merchant.routes'

export const settingsRoutes = [
  {
    path: 'settings',
    component: () => import('@modules/settings/layouts/SettingsLayout.vue'),
    name: 'settings',
    children: [
      ...currencyRoutes,
      ...merchantRoutes,
    ],
  },
]

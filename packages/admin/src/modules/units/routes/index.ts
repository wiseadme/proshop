import { RouteNames } from '@modules/units/enums/route-names.ts'

export const unitRoutes = [
    {
        path: 'units',
        component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/units/layouts/UnitsLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/units/pages/UnitsPage.vue'),
                name: RouteNames.UNITS,
            },
        ],
        meta: {
            name: RouteNames.UNITS,
        }
    },
]

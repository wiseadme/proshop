import { RouteNames } from '@shared/enums/route-names'

export const attributeRoutes = [
    {
        path: '/attributes',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attributes/layouts/AttributesLayout.vue'),
        name: RouteNames.ATTRIBUTES,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attributes/pages/AttributesPage/AttributesPage.vue'),
                name: 'attributes-table',
            },
        ],
        meta: {
            name: RouteNames.ATTRIBUTES
        }
    },
]

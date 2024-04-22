import { RouteNames } from '@modules/attributes/enums/route-names'

export const attributeRoutes = [
    {
        path: 'attributes',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attributes/layouts/AttributesLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attributes/pages/AttributesPage/AttributesPage.vue'),
                name: RouteNames.ATTRIBUTES,
            },
        ],
        meta: {
            name: RouteNames.ATTRIBUTES
        }
    },
]

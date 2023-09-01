import { RouteNames } from '@shared/enums/route-names'

export const productRoutes = [
    {
        path: '/products',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/products/layouts/ProductsLayout.vue'),
        name: RouteNames.PRODUCTS,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/products/pages/ProductsPage.vue'),
                name: 'products-table',
            },
        ],
    },
]

import { RouteNames } from '@modules/orders/enums/route-names'

export const orderRoutes = [
    {
        path: '/orders',
        component: () => import(/* webpackChunkName: "Page.ORDERS" */ '@modules/orders/layouts/OrdersLayout.vue'),
        name: RouteNames.ORDERS,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.ORDERS_TABLE" */ '@modules/orders/pages/OrdersPage.vue'),
                name: RouteNames.ORDERS_TABLE,
            },
        ],
        meta: {
            name: RouteNames.ORDERS
        }
    },
]

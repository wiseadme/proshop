import { RouteNames } from '@modules/orders/enums/route-names'

export const orderRoutes = [
    {
        path: 'orders/:orderId?',
        component: () => import(/* webpackChunkName: "Page.ORDERS" */ '@modules/orders/layouts/OrdersLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.ORDERS_TABLE" */ '@modules/orders/pages/OrdersPage.vue'),
                name: RouteNames.ORDERS,
            },
        ],
        meta: {
            name: RouteNames.ORDERS
        }
    },
]

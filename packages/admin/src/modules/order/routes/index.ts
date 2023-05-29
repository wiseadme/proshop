export const orderRoutes = [
    {
        path: '/orders',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/order/layouts/OrdersLayout.vue'),
        name: 'orders',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/order/pages/OrdersPage.vue'),
                name: 'order-table',
            },
        ],
    },
]

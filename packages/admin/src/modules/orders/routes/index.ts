export const orderRoutes = [
    {
        path: '/orders',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/orders/layouts/OrdersLayout.vue'),
        name: 'orders',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/orders/pages/OrdersPage.vue'),
                name: 'order-table',
            },
        ],
    },
]

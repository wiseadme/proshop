export const orderRoutes = [
  {
    path: '/orders',
    component: () => import('@modules/order/layouts/OrdersLayout.vue'),
    name: 'orders',
    children: [
      {
        path: '',
        component: () => import('@modules/order/pages/OrdersPage.vue'),
        name: 'order-table',
      },
    ],
  },
]

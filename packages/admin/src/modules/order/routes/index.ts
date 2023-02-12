export const orderRoutes = [
  {
    path: '/order',
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

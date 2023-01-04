export const orderRoutes = [
  {
    path: '/orders',
    component: () => import('@modules/orders/layouts/OrdersLayout.vue'),
    name: 'orders',
    children: [
      {
        path: '',
        component: () => import('@modules/orders/pages/OrdersPage.vue'),
        name: 'orders-table',
      },
    ],
  },
]

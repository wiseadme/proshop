export const orderRoutes = [
  {
    path: '/orders',
    component: () => import('@modules/order/layouts/OrderLayout.vue'),
    name: 'orders',
    children: [
      {
        path: '',
        component: () => import('@modules/order/pages/OrderPage.vue'),
        name: 'orders-table',
      },
    ],
  },
]

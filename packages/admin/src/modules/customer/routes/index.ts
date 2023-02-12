export const customerRoutes = [
  {
    path: '/customer',
    component: () => import('@modules/customer/layouts/CustomersLayout.vue'),
    name: 'customers',
    children: [
      {
        path: '',
        component: () => import('@modules/customer/pages/CustomersPage.vue'),
        name: 'customer-table'
      }
    ]
  }
]

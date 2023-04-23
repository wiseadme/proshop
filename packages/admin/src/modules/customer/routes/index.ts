export const customerRoutes = [
  {
    path: '/customers',
    component: () => import('@modules/customer/layouts/CustomersLayout.vue'),
    name: 'customers',
    children: [
      {
        path: '',
        component: () => import('@modules/customer/pages/CustomersPage.vue'),
        name: 'customers-table'
      }
    ]
  }
]

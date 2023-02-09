export const customerRoutes = [
  {
    path: '/customers',
    component: () => import('@modules/customers/layouts/CustomersLayout.vue'),
    name: 'customers',
    children: [
      {
        path: '',
        component: () => import('@modules/customers/pages/CustomersPage.vue'),
        name: 'customers-table'
      }
    ]
  }
]

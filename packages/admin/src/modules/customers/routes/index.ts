export const customerRoutes = [
    {
        path: '/customers',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customers/layouts/CustomersLayout.vue'),
        name: 'customers',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customers/pages/CustomersPage.vue'),
                name: 'customers-table'
            }
        ]
    }
]

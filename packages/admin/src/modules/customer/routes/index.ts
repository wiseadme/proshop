export const customerRoutes = [
    {
        path: '/customers',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customer/layouts/CustomersLayout.vue'),
        name: 'customers',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customer/pages/CustomersPage.vue'),
                name: 'customers-table'
            }
        ]
    }
]

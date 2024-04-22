import { RouteNames } from '@modules/customers/enums/route-names.ts'

export const customerRoutes = [
    {
        path: 'customers',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customers/layouts/CustomersLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/customers/pages/CustomersPage.vue'),
                name: RouteNames.CUSTOMERS
            }
        ],
        meta: {
            name: RouteNames.CUSTOMERS
        }
    }
]

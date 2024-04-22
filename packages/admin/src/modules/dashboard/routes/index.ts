export const dashboardRoutes = [
    {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/dashboard/layouts/DashboardLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/dashboard/pages/DashboardPage.vue'),
                name: 'dashboard',
            },
        ],
        meta: {
            name: 'dashboard'
        }
    },
]

export const dashboardRoutes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/dashboard/layouts/DashboardLayout.vue'),
        name: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/dashboard/pages/DashboardPage.vue'),
                name: 'dashboard-table',
            },
        ],
    },
]

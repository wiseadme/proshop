export const dashboardRoutes = [
  {
    path: '/',
    component: () => import('@modules/dashboard/layouts/DashboardLayout.vue'),
    name: 'dashboard',
    children: [
      {
        path: '',
        component: () => import('@modules/dashboard/pages/DashboardPage.vue'),
        name: 'dashboard-table',
      },
    ],
  },
]

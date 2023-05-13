export const usersRoutes = [
    {
        path: '/users',
        component: () => import('@modules/user/layouts/UsersLayout.vue'),
        name: 'users',
        children: [
            {
                path: '',
                component: () => import('@modules/user/pages/UsersPage.vue'),
                name: 'user-table'
            }
        ]
    }
]

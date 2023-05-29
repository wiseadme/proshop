export const usersRoutes = [
    {
        path: '/users',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/user/layouts/UsersLayout.vue'),
        name: 'users',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/user/pages/UsersPage.vue'),
                name: 'user-table'
            }
        ]
    }
]

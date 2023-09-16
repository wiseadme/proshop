export const usersRoutes = [
    {
        path: '/users',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/users/layouts/UsersLayout.vue'),
        name: 'users',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/users/pages/UsersPage.vue'),
                name: 'user-table'
            }
        ],
        meta: {
            name: 'users'
        }
    }
]

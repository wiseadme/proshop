import { RouteNames } from '@modules/users/enums/route-names.ts'

export const usersRoutes = [
    {
        path: 'users',
        component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/users/layouts/UsersLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/users/pages/UsersPage.vue'),
                name: RouteNames.USERS,
            }
        ],
        meta: {
            name: RouteNames.USERS,
        }
    }
]

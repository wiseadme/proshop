import { RouteNames } from '@modules/groups/enums/route-names'

export const groupsRoutes = [
    {
        path: 'groups',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/groups/layouts/GroupsLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/groups/pages/GroupsPage.vue'),
                name: RouteNames.Groups
            }
        ],
        meta: {
            name: RouteNames.Groups
        }
    }
]

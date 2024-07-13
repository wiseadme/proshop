import { RouteNames } from '@modules/groups/enums/route-names'

export const groupsRoutes = [
    {
        path: 'groups',
        component: () => import(/* webpackChunkName: "Page.GroupsLayout" */ '@modules/groups/layouts/GroupsLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.GroupsPage" */ '@modules/groups/pages/GroupsPage.vue'),
                name: RouteNames.GROUPS
            }
        ],
        meta: {
            name: RouteNames.GROUPS
        }
    }
]

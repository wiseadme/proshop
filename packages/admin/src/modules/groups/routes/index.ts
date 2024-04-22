export const groupsRoutes = [
    {
        path: '/groups',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/groups/layouts/GroupsLayout.vue'),
        name: 'groups',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/groups/pages/GroupsPage.vue'),
                name: 'groups-form'
            }
        ],
        meta: {
            name: 'groups'
        }
    }
]

export const metaTagRoutes = [
    {
        path: '/metatags',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/metatags/layouts/MetaTagsLayout.vue'),
        name: 'metatags',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/metatags/pages/MetaTagsPage.vue'),
                name: 'metatags-table'
            }
        ]
    }
]

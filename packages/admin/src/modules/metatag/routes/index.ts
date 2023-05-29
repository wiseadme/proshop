export const metaTagRoutes = [
    {
        path: '/metatags',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/metatag/layouts/MetaTagsLayout.vue'),
        name: 'metatags',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/metatag/pages/MetaTagsPage.vue'),
                name: 'metatags-table'
            }
        ]
    }
]

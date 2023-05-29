export const attributeRoutes = [
    {
        path: '/attributes',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attribute/layouts/AttributesLayout.vue'),
        name: 'attribute',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/attribute/pages/AttributesPage.vue'),
                name: 'attributes-table',
            },
        ],
    },
]

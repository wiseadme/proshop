export const productRoutes = [
    {
        path: '/products',
        component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/product/layouts/ProductsLayout.vue'),
        name: 'products',
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.Proshop" */ '@modules/product/pages/ProductsPage.vue'),
                name: 'products-table',
            },
        ],
    },
]

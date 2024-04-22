import { RouteNames } from '@modules/products/enums/route-names'

export const productRoutes = [
    {
        path: 'products',
        component: () => import(/* ChunkName: "Page.PageLayout" */ '@shared/layouts/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* ChunkName: "Page.ProductsPage" */ '@modules/products/pages/ProductsTablePage.vue'),
                name: RouteNames.PRODUCTS,
            },
            {
                path: ':action(edit|create)/:sku?/:section',
                components: {
                    default: () => import(/* ChunkName: "Page.ProductEditPage" */ '@modules/products/pages/ProductEditPage.vue'),
                    right: () => import(/* ChunkName: "Page.ProductRightSidebar" */ '@modules/products/components/ProductRightSidebar/ProductRightSidebar.vue'),
                },
                name: RouteNames.PRODUCT_EDIT,
            },
        ],
        meta: {
            name: RouteNames.PRODUCTS
        }
    },

]

import { RouteNames } from '@modules/products/enums/route-names'

export const productRoutes = [
    {
        path: 'products',
        component: () => import(/* webpackChunkName: "Page.PageLayout" */ '@shared/layouts/PageLayout.vue'),
        name: RouteNames.PRODUCTS,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "Page.ProductsPage" */ '@modules/products/pages/ProductsTablePage.vue'),
                name: RouteNames.PRODUCTS_TABLE,
            },
            {
                path: ':action(edit|create)/:sku?/:section',
                components: {
                    default: () => import(/* webpackChunkName: "Page.ProductEditPage" */ '@modules/products/pages/ProductEditPage.vue'),
                    right: () => import(/* webpackChunkName: "Page.ProductRightSidebar" */ '@modules/products/components/ProductRightSidebar/ProductRightSidebar.vue'),
                },
                name: RouteNames.PRODUCT_EDIT,
            },
        ],
        meta: {
            name: RouteNames.PRODUCTS
        }
    },

]

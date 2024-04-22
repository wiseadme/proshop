import { RouteNames } from '@modules/metatags/enums/route-names.ts'

export const metaTagRoutes = [
    {
        path: 'metatags',
        component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/metatags/layouts/MetaTagsLayout.vue'),
        children: [
            {
                path: '',
                component: () => import(/* ChunkName: "Page.Proshop" */ '@modules/metatags/pages/MetaTagsPage.vue'),
                name: RouteNames.META_TAGS,
            }
        ],
        meta: {
            name: RouteNames.META_TAGS,
        }
    }
]

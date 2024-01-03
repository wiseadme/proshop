import { RouteNames } from '@modules/settings/enums/route-names'
export const siteRoutes = [
    {
        path: 'site',
        redirect: 'site/edit/colors',
        component: () => import(/* webpackChunkName: "Layout.PAGE" */ '@shared/layouts/PageLayout.vue'),
        name: RouteNames.SITE_SETTINGS,
        children: [
            {
                path: ':action(edit|create)/:section',
                components: {
                    default: () => import(/* webpackChunkName: "Page.SiteEditPage" */ '@modules/settings/pages/SiteEditPage.vue'),
                    right: () => import(/* webpackChunkName: "Page.SiteRightSideBar" */ '@modules/settings/components/RightSideBar/SiteRightSideBar.vue')
                },
                name: RouteNames.SITE_EDIT_PAGE,
            }
        ]
    }
]

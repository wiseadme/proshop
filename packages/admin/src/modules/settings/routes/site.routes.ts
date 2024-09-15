import { RouteNames } from '@modules/settings/enums/route-names'

export const siteRoutes = [
    {
        path: 'site',
        component: () => import(/* "Layout.PAGE" */ '@shared/layouts/PageLayout.vue'),
        children: [
            {
                path: ':action(edit|create)/:section',
                components: {
                    default: () => import(/* "Page.SiteEditPage" */ '@modules/settings/pages/SiteSettingsPage.vue'),
                    right: () => import(/* "Page.SiteRightSideBar" */ '@modules/settings/components/RightSideBar/SiteRightSideBar.vue')
                },
                name: RouteNames.SITE_EDIT_PAGE,
            }
        ],
    }
]

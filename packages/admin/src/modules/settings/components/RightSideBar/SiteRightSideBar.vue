<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
    } from 'vue'

    import { useRoute } from 'vue-router'

    import { ISidebarTab } from '@shared/composables/use-right-sidebar'

    import { RightSidebar } from '@shared/components/RightSidebar'

    import { router } from '@app/router'
    import { RouteNames } from '@modules/settings/enums/route-names'
    import { Sections } from '@modules/settings/enums/sections'

    const ColorsBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/ColorsBlock.vue')))
    const SliderBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/SliderBlock.vue')))
    const BrandBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/BrandBlock.vue')))

    const route = useRoute()

    const tabs = computed(() => ([
        {
            component: ColorsBlock,
            title: 'Палитра',
            isActive: true,
            disabled: false,
            independent: false,
            section: Sections.COLORS_BLOCK,
        },
        {
            component: BrandBlock,
            title: 'Брэнд и логотипы',
            isActive: false,
            disabled: false,
            independent: false,
            section: Sections.BRAND_BLOCK,
        },
        {
            component: SliderBlock,
            title: 'Слайдер',
            isActive: false,
            disabled: false,
            independent: false,
            section: Sections.SLIDER_BLOCK,
        },
    ]))

    const onSelectTab = (tab: ISidebarTab) => {
        router.push({
            name: RouteNames.SITE_EDIT_PAGE,
            params: {
                action: route.params.action,
                section: tab.section,
            },
        })
    }
</script>
<template>
    <right-sidebar
        :tabs="tabs"
        @select-tab="onSelectTab"
    >
        <template #header>
            <div>Конфигурация сайта</div>
        </template>
    </right-sidebar>
</template>

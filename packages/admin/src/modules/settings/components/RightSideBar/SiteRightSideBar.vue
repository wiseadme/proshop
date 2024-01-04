<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
    } from 'vue'
    import { Sections } from '@modules/settings/enums/sections'
    import { RightSidebar } from '@shared/components/RightSidebar'
    import { ISidebarTab } from '@shared/composables/use-right-sidebar.ts'
    import { RouteNames } from '@modules/settings/enums/route-names.ts'
    import { router } from '@app/router'
    import { useRoute } from 'vue-router'

    const ColorsBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/ColorsBlock.vue')))
    const SliderBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/SliderBlock.vue')))

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
            component: SliderBlock,
            title: 'Слайдер',
            isActive: true,
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
        <template #buttons>
            <v-button
                class="my-4 app-border-radius mr-2"
                width="120"
                color="success"
            >
                Сохранить
            </v-button>
            <v-button
                class="my-4 app-border-radius"
                width="120"
                color="secondary"
            >
                Отмена
            </v-button>
        </template>
    </right-sidebar>
</template>

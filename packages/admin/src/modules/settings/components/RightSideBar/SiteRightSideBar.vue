<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
    } from 'vue'
    import { Sections } from '@modules/settings/enums/sections'
    import { RightSidebar } from '@shared/components/RightSidebar'

    const ColorsBlock = markRaw(defineAsyncComponent(() => import('@modules/settings/components/Site/ColorsBlock.vue')))

    const tabs = computed(() => [
        {
            component: ColorsBlock,
            title: 'Палитра',
            isActive: true,
            disabled: false,
            independent: false,
            section: Sections.COLORS_BLOCK,
        },
    ])

    const onSelectTab = () => {}
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

<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        unref
    } from 'vue'
    import { SidebarTab } from '@shared/composables/use-right-sidebar'
    import { useRoute, useRouter } from 'vue-router'
    import { RouteNames } from '@modules/categories/enums/route-names'
    import { IMAGES_BLOCK, INFO_BLOCK } from '@modules/categories/constants/sections'
    import { RightSidebar } from '@shared/components/RightSidebar'
    import { useCategory } from '@modules/categories/composables/use-category'

    const CategoryInfo = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryInfo.vue')))
    const CategoryImages = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryImages.vue')))

    const { model } = useCategory()

    const tabs = computed<SidebarTab[]>(() => [
        {
            component: CategoryInfo,
            title: 'Информация о категории',
            isActive: true,
            disabled: false,
            independent: false,
            section: INFO_BLOCK,
        },
        {
            component: CategoryImages,
            title: 'Изображения категории',
            isActive: true,
            disabled: !Boolean(unref(model).id),
            independent: false,
            section: IMAGES_BLOCK,
        },
    ])

    const route = useRoute()
    const router = useRouter()

    const onSelectTab = (tab: SidebarTab) => {
        router.push({
            name: RouteNames.CATEGORY_EDIT,
            params: {
                categoryId: route.params.categoryId,
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
            <div>{{ model.title }}</div>
        </template>
    </right-sidebar>
</template>

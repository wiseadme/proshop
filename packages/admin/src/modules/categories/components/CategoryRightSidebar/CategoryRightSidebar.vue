<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        markRaw,
        unref
    } from 'vue'
    import { ISidebarTab } from '@shared/composables/use-right-sidebar'
    import { useRoute, useRouter } from 'vue-router'
    import { RouteNames } from '@modules/categories/enums/route-names'
    import {
        CONDITIONS_BLOCK,
        FILTERS_BLOCK,
        IMAGES_BLOCK,
        INFO_BLOCK
    } from '@modules/categories/constants/sections'
    import { RightSidebar } from '@shared/components/RightSidebar'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'

    const CategoryInfo = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryInfo.vue')))
    const CategoryImages = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryImages.vue')))
    const CategoryFilters = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryFilters.vue')))
    const CategoryConditions = markRaw(defineAsyncComponent(() => import('@modules/categories/components/CategoryBlocks/CategoryConditions.vue')))

    const { model, isEditMode } = useCategoryModel()

    const tabs = computed<ISidebarTab[]>(() => [
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
            disabled: !unref(isEditMode),
            independent: false,
            section: IMAGES_BLOCK,
        },
        {
            component: CategoryFilters,
            title: 'Фильтры категории',
            isActive: true,
            disabled: !unref(isEditMode),
            independent: false,
            section: FILTERS_BLOCK,
        },
        {
            component: CategoryConditions,
            title: 'Состояние категории',
            isActive: true,
            disabled: !unref(isEditMode),
            independent: false,
            section: CONDITIONS_BLOCK,
        },
    ])

    const route = useRoute()
    const router = useRouter()

    const onSelectTab = (tab: ISidebarTab) => {
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

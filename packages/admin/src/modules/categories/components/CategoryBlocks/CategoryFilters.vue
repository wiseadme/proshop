<script lang="ts" setup>
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useCategoryFilters } from '@modules/categories/composables/use-category-filters'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'
    import { onMounted } from 'vue'

    const { model } = useCategoryModel()

    const {
        availableFilterGroups,
        getFilterGroupItems
    } = useCategoryFilters()

    onMounted(getFilterGroupItems)
</script>
<template>
    <v-row>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_IN"/>
                </template>
                <template #title>
                    Фильтры категории
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="model.filters"
                        item-key="name"
                    >
                        <template #title="{item}">
                            <span>{{ item }}</span>
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_OUT"/>
                </template>
                <template #title>
                    Список фильтров
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="availableFilterGroups"
                        item-key="name"
                    >
                        <template #title="{item}">
                            <span>{{ item.name }}</span>
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>

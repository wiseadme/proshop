<script lang="ts" setup>
    import { onMounted } from 'vue'

    import { useCategoryFilters } from '@modules/categories/composables/use-category-filters'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'

    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import type { IFilterGroup } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'


    const { model } = useCategoryModel()

    const ctgGroupSymbol = Symbol.for('category')

    const {
        availableFilterGroups,
        getFilterGroups,
        onUpdateFilters
    } = useCategoryFilters()

    const pullFunction = () => {
    }

    onMounted(getFilterGroups)
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
                        :group="ctgGroupSymbol"
                        item-key="id"
                        @add="onUpdateFilters"
                        @update="onUpdateFilters"
                    >
                        <template #title="{item}">
                            <span>{{ (item as IFilterGroup).name }}</span>
                        </template>
                        <template #tooltip="{item}">
                            <span>{{ (item as IFilterGroup).name }}</span>
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
                        item-key="id"
                        :group="{ name: ctgGroupSymbol, pull: pullFunction }"
                        @add="onUpdateFilters"
                    >
                        <template #title="{item}">
                            <span>{{ (item as IFilterGroup).name }}</span>
                        </template>
                        <template #tooltip="{item}">
                            <span>{{ (item as IFilterGroup).name }}</span>
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>

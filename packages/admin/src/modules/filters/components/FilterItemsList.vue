<script lang="ts" setup>
    import { unref, watch } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'

    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useFilterItems } from '@modules/filters/composables/use-filter-items'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IFilterGroup } from '@proshop/types'

    const { filterItems, getFilterItems, deleteFilterItem } = useFilterItemsService()
    const { filtersGroup, toggleForm, onEditFilter } = useFilterItems()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()

    const onSelectGroup = (group: IFilterGroup) => {
        filtersGroup.value = group
        getFilterItems({ groupId: group.id })
    }

    watch(filterGroups, async (groups) => {
        if (!groups.length) await getFilterGroupItems()

        filtersGroup.value = unref(filterGroups)[0]
        await getFilterItems({ groupId: unref(filtersGroup)!.id })
    }, { immediate: true })

</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="toggleForm"
            >
                Добавить
            </v-button>
        </template>
        <template #title>
            Фильтры
        </template>
        <template #body>
            <v-select
                v-model="filtersGroup"
                label="Группа фильтров"
                :items="filterGroups"
                value-key="name"
                @select="onSelectGroup"
            />
            <items-list
                :items="filterItems"
                @delete="deleteFilterItem"
                @edit="onEditFilter"
            >
                <template #title="{item}">
                    <span>{{ item.value }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>

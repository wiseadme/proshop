<script lang="ts" setup>
    import {
        onBeforeMount,
        unref,
        watch
    } from 'vue'

    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterGroups } from '@modules/filters/composables/use-filter-groups'
    import { useFilterItems } from '@modules/filters/composables/use-filter-items'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'

    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const { filterItems, getFilterItems, deleteFilterItem } = useFilterItemsService()
    const { filtersGroup, toggleForm, onEditFilter } = useFilterItems()
    const { filterGroups } = useFilterGroups()
    const { getFilterGroups } = useFilterGroupService()

    watch(filterGroups, ([group]) => {
        if (group) {
            filtersGroup.value = group
            getFilterItems({ groupId: group.id })
        }
    }, { immediate: true })

    onBeforeMount(async () => {
        if (!unref(filterGroups).length) {
            await getFilterGroups()
        }
    })

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

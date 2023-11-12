<script lang="ts" setup>
    import {
        ref,
        unref,
        watch
    } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'

    import { VSvg } from '@shared/components/VSvg'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useFilterItemForm } from '@modules/filters/composables/use-filter-item-form'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { IFilterGroup } from '@proshop/types'

    const { filterItems, getFilterItems, deleteFilterItem } = useFilterItemsService()
    const { toggleForm, onEditFilter } = useFilterItemForm()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()

    const selectedGroup = ref<Maybe<IFilterGroup>>(null)

    const onSelectGroup = (group: IFilterGroup) => {
        selectedGroup.value = group
        getFilterItems({ groupId: group.id })
    }

    watch(filterGroups, async (groups) => {
        if (!groups.length) await getFilterGroupItems()

        selectedGroup.value = unref(filterGroups)[0]
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
                v-model="selectedGroup"
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

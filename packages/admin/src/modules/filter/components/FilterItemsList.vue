<script lang="ts" setup>
    import ItemsList from '@shared/components/ItemsList'
    import { useFilterItemsService } from '@modules/filter/composables/use-filter-items-service'

    const { filterItems, deleteFilterItem } = useFilterItemsService()
</script>
<template>
    <items-list
        :items="filterItems"
        @delete="deleteFilterItem"
    >
        <template #title="{item}">
            <span>{{ item.value }}</span>
        </template>
    </items-list>
</template>

<script lang="ts" setup>
    import ItemsList from '@shared/components/ItemsList'
    import { useFilterGroups } from '@modules/filter/composables/use-filter-groups'

    const { filterGroups, onDeleteGroup } = useFilterGroups()
</script>
<template>
    <items-list
        :items="filterGroups"
        @delete="onDeleteGroup"
    >
        <template #title="{item}">
            <span>{{ item.name }}</span>
        </template>
        <template #subtitle="{item}">
            <span>{{ item.attributeName }}</span>
        </template>
    </items-list>
</template>

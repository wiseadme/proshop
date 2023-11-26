<script lang="ts" setup>
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { onMounted } from 'vue'

    const { getFilterGroupItems, filterGroups } = useFilterGroupService()

    onMounted(getFilterGroupItems)
</script>
<template>
    <div class="filters">
        <v-select
            label="Группа фильтров"
            :items="filterGroups"
        />
        <v-select
            :items="[]"
            label="Фильтры"
        />
    </div>
</template>

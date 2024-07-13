<script lang="ts" setup>
    import { onMounted } from 'vue'

    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'

    const { getFilterGroups, filterGroups } = useFilterGroupService()

    onMounted(getFilterGroups)
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

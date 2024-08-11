<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useFilterGroups } from '@modules/filters/composables/view/use-filter-groups.ts'

    import FilterGroupsList from '@modules/filters/components/FilterGroupsList.vue'
    import FilterGroupFormModal from '@modules/filters/components/modals/FilterGroupFormModal.vue'

    const { getFilterGroupAttributes, getFilterGroups } = useFilterGroups()

    onBeforeMount(() => {
        getFilterGroupAttributes()
        getFilterGroups()
    })
</script>
<template>
    <v-layout>
        <v-row>
            <v-col
                xl="8"
                lg="8"
                offset-xl="2"
                offset-lg="2"
            >
                <filter-groups-list/>
            </v-col>
        </v-row>
        <filter-group-form-modal/>
    </v-layout>
</template>

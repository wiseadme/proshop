<script lang="ts" setup>
    import FilterGroupFormModal from '@modules/filters/components/modals/FilterGroupFormModal.vue'
    import FilterGroupsList from '@modules/filters/components/FilterGroupsList.vue'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'

    const { getFilterGroupAttributes, getFilterGroupItems } = useFilterGroupService()

    getFilterGroupAttributes()
    getFilterGroupItems()
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
                <filter-groups-list />
            </v-col>
        </v-row>
        <filter-group-form-modal/>
    </v-layout>
</template>

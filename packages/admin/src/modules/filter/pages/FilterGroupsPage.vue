<script lang="ts" setup>
    import FilterGroupForm from '@modules/filter/components/FilterGroupForm.vue'
    import FilterGroupsList from '@modules/filter/components/FilterGroupsList.vue'
    import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'

    const { getFilterGroupAttributes, getFilterGroupItems } = useFilterGroupService()

    getFilterGroupAttributes()
    getFilterGroupItems()
</script>
<template>
    <v-layout>
        <v-row>
            <v-col cols="4">
                <filter-group-form/>
            </v-col>
            <v-col cols="8">
                <filter-groups-list />
            </v-col>
        </v-row>
    </v-layout>
</template>

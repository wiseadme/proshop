<script lang="ts" setup>
    import FilterItemsList from '@modules/filters/components/FilterItemsList.vue'
    import FilterItemsFormModal from '@modules/filters/components/modals/FilterItemsFormModal.vue'
</script>
<template>
    <v-layout>
        <filter-items-form-modal/>
        <v-row>
            <v-col
                offset-xl="2"
                offset-lg="2"
                xl="8"
                lg="8"
            >
                <filter-items-list/>
            </v-col>
        </v-row>
    </v-layout>
</template>

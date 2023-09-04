<script lang="ts" setup>
    import FilterItemForm from '@modules/filters/components/FilterItemForm.vue'
    import FilterItemsList from '@modules/filters/components/FilterItemsList.vue'
</script>
<template>
    <v-layout>
        <v-row>
            <v-col cols="4">
                <filter-item-form/>
            </v-col>
            <v-col cols="8">
                <filter-items-list/>
            </v-col>
        </v-row>
    </v-layout>
</template>

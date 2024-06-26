<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoriesTable } from '@modules/categories/composables/use-categories-table'

    import CategoryTable from '@modules/categories/components/CategoriesTable'


    const {
        categories,
        getCategories
    } = useCategoriesService()

    const {onDeleteRow} = useCategoriesTable()
    const { cols } = useCategoriesTable()

    onBeforeMount(async () => {
        await getCategories()
    })

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col>
                <category-table
                    :cols="cols"
                    :rows="categories"
                    @delete:category="onDeleteRow"
                />
            </v-col>
        </v-row>
    </v-layout>
</template>

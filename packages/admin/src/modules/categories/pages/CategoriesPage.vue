<script lang="ts" setup>
    import CategoryTable from '@modules/categories/components/CategoriesTable'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoriesTable } from '@modules/categories/composables/use-categories-table'

    const {
        categories,
        getCategories
    } = useCategoriesService()

    const {
        onDeleteCategory,
    } = useCategoryModel()

    const { cols } = useCategoriesTable()

    getCategories()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col>
                <category-table
                    :cols="cols"
                    :rows="categories"
                    @delete:category="onDeleteCategory"
                />
            </v-col>
        </v-row>
    </v-layout>
</template>

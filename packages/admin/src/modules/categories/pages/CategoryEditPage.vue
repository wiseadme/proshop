<script lang="ts" setup>
    import { unref } from 'vue'

    import { useRoute } from 'vue-router'

    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'

    import { useRightSidebar } from '@shared/composables/use-right-sidebar'


    const { activeItem } = useRightSidebar()
    const {setCategoryModel} = useCategoryModel()
    const { categories, getCategory, getCategories } = useCategoriesService()
    const route = useRoute()

    const onEdit = () => {}

    if (route.params.categoryId) {
        getCategory(route.params.categoryId as string).then(setCategoryModel)
    }

    if (!unref(categories).length) {
        getCategories()
    }

</script>
<template>
    <v-layout column>
        <component
            :is="activeItem.component"
            v-if="activeItem"
            @edit="onEdit"
        />
    </v-layout>
</template>

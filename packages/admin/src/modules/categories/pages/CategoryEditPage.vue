<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useRoute } from 'vue-router'
    import { unref } from 'vue'

    const { activeItem } = useRightSidebar()
    const { categories, getCategory, getCategories } = useCategoriesService()
    const route = useRoute()

    const onEdit = () => {}

    if (route.params.categoryId) {
        getCategory(route.params.categoryId as string)
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
        ></component>
    </v-layout>
</template>

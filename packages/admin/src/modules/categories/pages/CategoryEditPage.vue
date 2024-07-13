<script lang="ts" setup>
    import { unref } from 'vue'

    import { useRoute } from 'vue-router'

    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'

    import { useRightSidebar } from '@shared/composables/use-right-sidebar'


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
        />
    </v-layout>
</template>

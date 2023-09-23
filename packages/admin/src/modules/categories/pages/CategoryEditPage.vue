<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useRoute } from 'vue-router'

    const { activeItem } = useRightSidebar()
    const { getCategory, getCategories } = useCategoriesService()
    const route = useRoute()

    const onEdit = () => {}

    getCategory(route.params.categoryId as string)
    getCategories()

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

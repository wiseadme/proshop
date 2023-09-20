<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useRoute } from 'vue-router'

    const { activeItem } = useRightSidebar()
    const { getCategories } = useCategoriesService()
    const route = useRoute()

    const onEdit = () => {}

    getCategories({ id: route.params.categoryId })

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

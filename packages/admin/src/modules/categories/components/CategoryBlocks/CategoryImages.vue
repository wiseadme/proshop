<script lang="ts" setup>
    import { ImagesLoader } from '@shared/components/ImagesLoader'
    import { useCategory } from '@modules/categories/composables/use-category'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'

    const { onDeleteCategoryImage, onUploadCategoryImage } = useCategory()
    const { category } = useCategoriesService()

    const onLoadImage = ([file]) => {
        if (!file) return

        onUploadCategoryImage(file)
    }
</script>
<template>
    <v-layout>
        <images-loader
            :assets="category.assets"
            @delete="onDeleteCategoryImage"
            @load="onLoadImage"
        />
    </v-layout>
</template>

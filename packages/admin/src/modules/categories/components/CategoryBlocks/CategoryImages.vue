<script lang="ts" setup>
    import { ImagesLoader } from '@shared/components/ImagesLoader'
    import { useCategory } from '@modules/categories/composables/use-category'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoryImages } from '@modules/categories/composables/use-category-images'
    import { IAsset } from '@proshop/types'

    const { onDeleteCategoryImage, onUploadCategoryImage } = useCategory()
    const { onUpdateImagesOrders, onUpdateMainImage } = useCategoryImages()
    const { category } = useCategoriesService()

    const onLoadImage = ([file]) => {
        if (!file) return

        onUploadCategoryImage(file)
    }
</script>
<template>
    <v-layout>
        <images-loader
            :assets="category.assets as IAsset[]"
            @delete="onDeleteCategoryImage"
            @load="onLoadImage"
            @update:main="onUpdateMainImage"
            @update:order="onUpdateImagesOrders"
        />
    </v-layout>
</template>

<script lang="ts" setup>
    import { ImagesLoader } from '@shared/components/ImagesLoader'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoryImages } from '@modules/categories/composables/use-category-images'
    import { computed, unref } from 'vue'

    const {
        onUpdateImagesOrders,
        onUpdateMainImage,
        onUploadCategoryImage,
        onDeleteCategoryImage,
    } = useCategoryImages()

    const { category } = useCategoriesService()

    const assets = computed(() => unref(category)?.assets?.sort((a, b) => a.order - b.order) || [])

    const onLoadImage = ([file]) => {
        if (!file) return

        onUploadCategoryImage(file)
    }
</script>
<template>
    <v-layout>
        <images-loader
            :assets="assets"
            @delete="onDeleteCategoryImage"
            @load="onLoadImage"
            @update:main="onUpdateMainImage"
            @update:order="onUpdateImagesOrders"
        />
    </v-layout>
</template>

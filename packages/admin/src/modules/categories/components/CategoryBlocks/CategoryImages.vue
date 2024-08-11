<script lang="ts" setup>
    import { computed, unref } from 'vue'

    import { useCategoryImages } from '@modules/categories/composables/use-category-images'
    import { useCategoryModel } from '@modules/categories/composables/use-category-model'

    import { ImagesLoader } from '@shared/components/ImagesLoader'

    const {
        assets,
        onUpdateImagesOrders,
        onUpdateMainImage,
        onUploadCategoryImage,
        onDeleteCategoryImage,
    } = useCategoryImages()

    const { model } = useCategoryModel()

    console.log(model)

    const sortedAssets = computed(() => unref(assets).slice().sort((a, b) => a.order - b.order) || [])

    const onLoadImage = ([file]) => {
        if (!file) return

        onUploadCategoryImage(file)
    }
</script>
<template>
    <v-layout>
        <images-loader
            :assets="sortedAssets"
            :main="model.image"
            @delete="onDeleteCategoryImage"
            @load="onLoadImage"
            @update:main="onUpdateMainImage"
            @update:order="onUpdateImagesOrders"
        />
    </v-layout>
</template>

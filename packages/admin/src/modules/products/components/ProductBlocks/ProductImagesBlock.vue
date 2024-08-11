<script lang="ts" setup>
    import { useProductImages } from '@modules/products/composables/use-product-images'
    import { useProductModel } from '@modules/products/composables/use-product-model'

    import { ImagesLoader } from '@shared/components/ImagesLoader'

    const {
        assets,
        onLoadImage,
        setAsMainImage,
        onDeleteImage,
        updateImagesOrders
    } = useProductImages()

    const { model } = useProductModel()

</script>
<template>
    <v-layout>
        <images-loader
            :assets="assets.sort((a, b) => a.order - b.order)"
            :main="model.image"
            @load="onLoadImage"
            @update:main="setAsMainImage"
            @update:order="updateImagesOrders"
            @delete="onDeleteImage"
        />
    </v-layout>
</template>
<style lang="scss" scoped>
</style>

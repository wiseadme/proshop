<script lang="ts" setup>
    import { ImagesLoader } from '@shared/components/ImagesLoader'
    import { useProductImages } from '@modules/products/composables/use-product-images'

    const {
        assets,
        onLoadImage,
        setAsMainImage,
        onDeleteImage,
    } = useProductImages()

</script>
<template>
    <v-layout>
        <images-loader
            :assets="assets"
            @load="onLoadImage"
            @main="setAsMainImage"
            @delete="onDeleteImage"
        />
    </v-layout>
</template>
<style lang="scss" scoped>
    @import "@modules/products/components/ProductBlocks/styles/ProductImagesBlock";
</style>

<script lang="ts" setup>
    import { useProduct } from '@modules/products/composables/use-product'

    const { model } = useProduct()
</script>
<template>
    <div
        style="height: calc(100vh - 76px);"
        class="product-sidebar white sticky white--text app-border-radius elevation-2 pt-2"
    >
        <v-card
            color="primary"
            style="width: auto; font-size: .8rem"
            class="pa-2 mx-2"
            elevation="2"
        >
            {{ model.name }}
        </v-card>
    </div>
</template>
<style lang="scss">
    .sticky {
        position: sticky;
        top: calc(#{$header-height} + #{$page-top-padding})
    }
</style>

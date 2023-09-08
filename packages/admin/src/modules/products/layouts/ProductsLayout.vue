<script lang="ts" setup>
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { onMounted } from 'vue'
    import { RouteNames } from '@modules/products/enums/route-names'

    const { onInit } = useProductsService()

    onMounted(onInit)
</script>
<template>
    <v-main style="position: relative">
        <v-row no-gutter>
            <v-col :cols="$route.name === RouteNames.PRODUCT_EDIT ? 10 : 12">
                <router-view/>
            </v-col>
            <v-col
                v-if="$route.name === RouteNames.PRODUCT_EDIT"
                cols="2"
            >
                <router-view name="right"/>
            </v-col>
        </v-row>
    </v-main>
</template>


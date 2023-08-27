<script lang="ts" setup>
    import {
        computed,
        unref,
        watch,
    } from 'vue'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductCategories } from '@modules/product/composables/use-product-categories'
    import { ICategory } from '@proshop/types'

    const { model } = useProduct()
    const { categoryItems, product } = useProductsService()
    const { categoriesMap, toggleCategory } = useProductCategories()

    /**
     * @description - при открытии модального окна
     * сбрасываем все категории (снимаем все выделения)
     */

    const categories = computed<ICategory[]>(() => unref(categoryItems)?.filter(it => !it.children?.length) || [])
    const productCategories = computed<ICategory[]>(() => unref(product)?.categories as ICategory[])

    watch(productCategories, (items) => {
        /**
         * @description - в режиме редактирования выделяем
         * все имеющиеся категории продукта
         */

        items.forEach(ctg => {
            if (!unref(categoriesMap)[ctg.id]) {
                toggleCategory(ctg)
            }
        })
    }, { immediate: true })

</script>
<template>
    <v-row class="pa-4 app-border-radius">
        <v-col cols="4">
            <v-card
                color="white"
                style="width: 100%"
                class="app-border-radius"
                elevation="2"
            >
                <v-card-content>
                    <v-button
                        v-for="it in categories"
                        :key="it.id"
                        class="mr-2 mb-2"
                        :color="categoriesMap[it.id] ? 'primary' : 'secondary'"
                        elevation="2"
                        @click="toggleCategory(it)"
                    >
                        {{ it.title }}
                    </v-button>
                </v-card-content>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
    import {
        computed,
        unref,
        watch,
    } from 'vue'
    // import { useProduct } from '@modules/product/composables/use-product'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductCategories } from '@modules/product/composables/use-product-categories'
    import { ICategory } from '@proshop/types'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'

    // const { model } = useProduct()
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
            <form-card>
                <template #title>
                    <v-svg
                        viewBox="-30 0 512 512"
                        :path="SvgPaths.DIAGRAM_NESTED"
                    />
                </template>
                <template #body>
                    <v-select
                        label="Выбрать категории"
                        color="primary"
                    />
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
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>

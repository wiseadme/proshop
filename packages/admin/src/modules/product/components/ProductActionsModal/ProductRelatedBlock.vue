<script lang="ts" setup>
    import {
        ref,
        unref,
        watch
    } from 'vue'
    import { ICategory, IProduct } from '@ecommerce-platform/types'
    import { useProductRelated } from '@modules/product/composables/use-product-related'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
    import { useProductsService } from '@modules/product/composables/use-products-service'

    const { model } = useProduct()
    const { categoryItems } = useProductsService()
    const { showModal } = useProductActionsModal()
    const {
        category,
        related,
        categoryProducts,
        getProducts
    } = useProductRelated()

    const selects = ref<IProduct[]>([])
    const productsMap: Record<string, Record<string, IProduct>> = {}

    let isCategoryChanged: boolean = false

    const clearSelects = () => selects.value = []

    const setToCategoryMap = (product: IProduct) => {
        product.categories?.forEach((category: ICategory) => {

            const categoryMap = productsMap[unref(category).url!]
            productsMap[unref(category).url!] = categoryMap || {}

            productsMap[category!.url!][product._id] = product
        })
    }

    const selectRelatedFromProducts = () => {
        const categoryMap = productsMap[unref(category)!.url!]

        unref(categoryProducts)!.forEach((it) => {
            if (!categoryMap[it._id]) return

            selects.value.push(it)
        })
    }

    const setRelatedProducts = async () => {
        if (!unref(category)) return

        clearSelects()

        isCategoryChanged = true
        productsMap[unref(category).url!] = {} as Record<string, IProduct>

        await getProducts()

        unref(model).related?.forEach((pr) => setToCategoryMap(pr))
        selectRelatedFromProducts()

        isCategoryChanged = false
    }

    const removeUnselectedProductsFromMap = (relatedProducts: IProduct[]) => {
        const categoryMap = productsMap[unref(category)!.url!]

        /** Массив всех id продуктов замапенных по категории */
        const categoryProductIds = Object.keys(categoryMap)

        for (const id of categoryProductIds) {
            if (!relatedProducts.find(rel => rel._id === id)) {
                delete categoryMap[id]
                break
            }
        }
    }

    const onUpdateRelatedProductsArray = (newRelated, oldRelated) => {
        /** если изменилась категория то пропускаем сброс выбранных ранее продуктов */
        if (isCategoryChanged || !unref(category)) return

        /** если удален продукт из рекомендуемых то удаляем его из мапы */
        if (newRelated.length < oldRelated.length) {
            removeUnselectedProductsFromMap(newRelated)
        }

        /** объект категории с рекомендованными продуктами по id ключу */
        const categoryMap = productsMap[unref(category)!.url!]

        /** массив всех категорий с рекомендованными продуктами по id ключу */
        const categories = Object.values(productsMap)

        unref(selects).forEach(it => {
            if (!categoryMap?.[it._id!]) categoryMap[it._id!] = it
        })

        unref(model).related = categories.map(it => Object.keys(it)).flat()
    }

    const onShowModal = (state) => {
        !state && clearSelects()
    }

    watch(category, setRelatedProducts)
    watch(selects, onUpdateRelatedProductsArray)
    watch(model, setRelatedProducts)
    watch(showModal, onShowModal)

</script>
<template>
    <v-row class="white pa-4 elevation-2 app-border-radius">
        <v-col class="block-head pb-6 mb-8">
            <h2 class="block-head__title">
                Рекомендуемые товары
            </h2>
        </v-col>
        <v-col>
            <v-card
                color="white"
                style="width: 100%"
            >
                <v-card-content>
                    <v-row>
                        <v-col cols="3">
                            <v-select
                                v-model="category"
                                label="Категории"
                                :items="categoryItems"
                                value-key="title"
                            />
                        </v-col>
                        <v-col cols="3">
                            <v-multi-select
                                v-model="selects"
                                label="Список товаров"
                                :items="categoryProducts"
                                value-key="name"
                                chip
                            />
                        </v-col>
                    </v-row>
                    <v-row class="mt-4">
                        <v-col
                            v-for="it in related"
                            :key="it._id"
                            cols="2"
                        >
                            <div class="related-item elevation-2 pa-2 d-flex">
                                <div class="related-item__image">
                                    <img
                                        :src="it.image"
                                        alt=""
                                        style="width: 100px; height: 100px; object-fit: cover"
                                    >
                                </div>
                                <div class="related-item__content px-1">
                                    <span>{{ it.name }}</span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-content>
            </v-card>
        </v-col>
    </v-row>
</template>

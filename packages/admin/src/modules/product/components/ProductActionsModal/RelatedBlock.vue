<script lang="ts">
  import { defineComponent, watch, ref, unref } from 'vue'
  import { IProduct } from '@ecommerce-platform/types'
  import { useProductRelated } from '@modules/product/composables/use-product-related'
  import { useProduct } from '@modules/product/composables/use-product'

  export default defineComponent({
    name: 'related-block',
    setup() {
      const { model } = useProduct()

      const {
        category,
        related,
        categoryProducts,
        categoryItems,
        getProducts
      } = useProductRelated()

      const selects = ref<IProduct[]>([])
      const productsMap: Record<string, IProduct> = {}

      let isCategoryChanged = false

      const setExistingRelatedProductsToMap = (model: IProduct) => {
        model.related?.forEach((product) => {
          product.categories.forEach(ctg => {

            if (!productsMap[ctg._id]) {
              productsMap[ctg._id] = {} as IProduct
            }

            productsMap[ctg!._id!][product._id] = product
          })
        })

        setCurrentCategoryProducts()
      }

      const setCurrentCategoryProducts = () => {
        isCategoryChanged = true
        selects.value = []

        if (!productsMap[unref(category)._id!]) {
          productsMap[unref(category)._id!] = {} as IProduct
        }

        getProducts().then(() => isCategoryChanged = false)
      }

      const onProductsChange = (items: IProduct[]) => {
        const categoryMap = productsMap[unref(category)!._id!]

        items?.forEach((it) => categoryMap[it._id] && selects.value.push(it))
      }

      const removeUnselectedProductsFromMap = (relatedProducts: IProduct[]) => {
        const categoryProductIds = Object.keys(productsMap[unref(category)!._id!])
        const categoryMap = productsMap[unref(category)!._id!]

        for (const id of categoryProductIds) {
          const found = relatedProducts.find(rel => rel._id === id)

          if (!found) {
            delete categoryMap[id]
            break
          }
        }
      }

      const onUpdateRelatedProductsArray = (newRelated, oldRelated) => {
        /** если изменилась категория то пропускаем сброс выбранных ранее продуктов */
        if (isCategoryChanged) return

        /** если удален продукт из рекомендуемых то удаляем его из мапы */
        if (newRelated.length < oldRelated.length) {
          removeUnselectedProductsFromMap(newRelated)
        }

        /** объект категории с рекомендованными продуктами по id ключу */
        const categoryMap = productsMap[unref(category)!._id!]

        /** массив всех категорий с рекомендованными продуктами по id ключу */
        const categories = Object.values(productsMap)

        unref(selects).forEach(it => {
          if (!categoryMap?.[it._id!]) categoryMap[it._id!] = it
        })

        unref(model).related = categories.map(it => Object.keys(it)).flat()
      }

      watch(category, setCurrentCategoryProducts)
      watch(categoryProducts, onProductsChange)
      watch(selects, onUpdateRelatedProductsArray)
      watch(model, setExistingRelatedProductsToMap)

      return {
        category,
        categoryItems,
        related,
        categoryProducts,
        selects,
      }
    }
  })

</script>
<template>
  <v-row no-gutter>
    <v-col class="white elevation-2">
      <v-card
        color="white"
        style="width: 100%"
      >
        <v-card-title>
          <h3 class="green--text">
            Рекомендуемые товары
          </h3>
        </v-card-title>
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
                v-if="categoryProducts"
                v-model="selects"
                label="Список товаров"
                :items="categoryProducts"
                chip
                value-key="name"
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

<script lang="ts">
  import { defineComponent, ref, unref, watch } from 'vue'
  import { ICategory, IProduct } from '@ecommerce-platform/types'
  import { useProductRelated } from '@modules/product/composables/use-product-related'
  import { useProduct } from '@modules/product/composables/use-product'
  import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
  import { useProductsService } from '@modules/product/composables/use-products-service'

  export default defineComponent({
    name: 'related-block',
    setup() {
      const { model } = useProduct()
      const { categoryItems } = useProductsService()

      const {
        category,
        related,
        categoryProducts,
        getProducts
      } = useProductRelated()

      const { showModal } = useProductActionsModal()
      const selects = ref<IProduct[]>([])

      let productsMap: Record<string, IProduct> = {}
      let isCategoryChanged = false

      const clearSelects = () => selects.value = []

      const setToCategoryMap = (product: IProduct) => {
        product.categories?.forEach((category: ICategory) => {
          if (!productsMap[category.url]) {
            productsMap[category.url] = {} as IProduct
          }

          productsMap[category!.url!][product._id] = product
        })
      }

      const setExistingRelatedProductsToMap = (model: IProduct) => {
        model.related?.forEach((pr) => setToCategoryMap(pr))
        setCurrentCategoryProducts()
      }

      const setCurrentCategoryProducts = async () => {
        isCategoryChanged = true
        clearSelects()

        if (!productsMap[unref(category).url!]) {
          productsMap[unref(category).url!] = {} as IProduct
        }

        await getProducts()

        isCategoryChanged = false
      }

      const onLoadNewProducts = (items: IProduct[]) => {
        const categoryMap = productsMap[unref(category)!.url!]
        items?.forEach((it) => categoryMap[it._id] && selects.value.push(it))
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
        if (isCategoryChanged) return

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

      watch(category, setCurrentCategoryProducts, {immediate: true})
      watch(categoryProducts, onLoadNewProducts)
      watch(selects, onUpdateRelatedProductsArray)
      watch(model, setExistingRelatedProductsToMap)
      watch(showModal, (state) => !state && clearSelects())

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
  <v-row
    no-gutter
    class="white elevation-2"
  >
    <v-col>
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

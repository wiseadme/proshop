<script lang="ts">
  import { defineComponent, watch, nextTick, ref, unref } from 'vue'
  import { IProduct } from '@ecommerce-platform/types'
  import { useProductRelatedBlock } from '@modules/product/composables/use-product-related-block'
  import { useProduct } from '@modules/product/composables/use-product'

  export default defineComponent({
    name: 'related-block',
    setup() {
      const {
        category,
        related,
        products,
        categories,
        getCategoryProducts
      } = useProductRelatedBlock()

      const { model } = useProduct()

      let selectedProducts = ref<IProduct[]>([])
      let productsMap: Record<string, IProduct> = {}
      let isCategoryChanged = false

      watch(selectedProducts, (selects) => {
        /** если изменилась категория то пропускаем сброс выбранных ранее продуктов */
        if (isCategoryChanged) return

        nextTick(() => {
          productsMap[unref(category).url] = {} as any
          selects.forEach(it => productsMap[unref(category).url][it._id!] = it)
          unref(model).related = Object.values(productsMap).map(it => Object.keys(it)).flat()
        })
      }, { immediate: true })

      watch(category, () => {
        isCategoryChanged = true
        selectedProducts = []
        getCategoryProducts()

        /** nextTick нужен чтоб не среагировал watch на selectedProducts */
        nextTick(() => isCategoryChanged = false)
      }, { immediate: true })

      watch(products, (items) => {
        items?.forEach((it) => {
          if (productsMap[unref(category)!.url]?.[it._id!]) {
            selectedProducts.value.push(it)
          }
        })
      }, { immediate: true })

      return {
        category,
        categories,
        related,
        products,
        selectedProducts,
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
            <v-col cols="4">
              <v-select
                v-model="category"
                label="Категории"
                :items="categories"
                value-key="title"
              />
            </v-col>
            <v-col cols="4">
              <v-multi-select
                v-if="products"
                v-model="selectedProducts"
                label="Список товаров"
                :items="products"
                chip
                value-key="name"
              />
            </v-col>
          </v-row>
          <!--          <v-row>-->
          <!--            <v-col>-->
          <!--              <v-chip-->
          <!--                v-for="it in products"-->
          <!--                :key="it._id"-->
          <!--                :title="it.name"-->
          <!--                elevation="2"-->
          <!--                class="mr-2 mb-2"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <v-row class="mt-4">
            <v-col
              v-for="it in related"
              :key="it._id"
              cols="3"
            >
              <div class="related-item elevation-2 pa-2 d-flex">
                <div class="related-item__image">
                  <img
                    :src="it.image"
                    alt=""
                    style="width: 100px; height: 100px"
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

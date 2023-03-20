<script setup lang="ts">
  import { watch, nextTick } from 'vue'
  import { ICategory } from '@ecommerce-platform/types'

  const emit = defineEmits([ 'load:related', 'update:related' ])

  const props = defineProps({
    products: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    related: {
      type: Array,
      default: () => []
    }
  })

  let category = $ref<Maybe<ICategory>>(props.categories?.[0])
  let selectedProducts = $ref([])
  let productsMap = {}
  let isCategoryChanged = false

  let computedCategory = $computed({
    get: () => category,
    set: (val) => category = val as ICategory
  })

  watch(() => selectedProducts, (selects) => {
    /** если изменилась категория то пропускаем сброс выбранных ранее продуктов */
    if (isCategoryChanged) return

    nextTick(() => {
      productsMap[category.url] = {}
      selects.forEach(it => productsMap[category.url][it._id] = it)

      emit('update:related', Object.values(productsMap).map(it => Object.keys(it)).flat())
    })
  }, { immediate: true })

  watch(() => category, (newCategory) => {
    isCategoryChanged = true
    selectedProducts = []
    emit('load:related', newCategory)

    /** nextTick нужен чтоб не среагировал watch на selectedProducts */
    nextTick(() => isCategoryChanged = false)
  }, { immediate: true })

  watch(() => props.products, (items) => {
    items?.forEach((it) => {
      if (productsMap[category.url]?.[it._id]) {
        selectedProducts.push(it)
      }
    })
  }, { immediate: true })

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
                v-model="computedCategory"
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

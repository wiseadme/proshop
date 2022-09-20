<script lang="ts">
  import { defineComponent, useFetch, useRoute, unref } from '@nuxtjs/composition-api'
  import { useProductService } from '~/services/product.service'
  import { useCategoryService } from '~/services/category.service'

  export default defineComponent({
    name: 'category',
    setup(){
      const productService = useProductService()
      const categoryService = useCategoryService()
      const route = useRoute()

      const getProducts = async () => {
        const { categories } = categoryService
        const { id } = unref(route).params
        const current = unref(categories)!.find(it => it.url === id)

        return productService.fetchCategoryProducts(current._id)
      }

      useFetch(async () => {
        if (!unref(categoryService.categories)) {
          await categoryService.fetchCategories()
        }

        await getProducts()
      })

      return {
        productService
      }
    }
  })
</script>
<template>
  <v-layout>
    <v-row no-gutters>
      <v-col
        v-for="it in productService.products.value"
        :key="it._id"
        xl="2"
        lg="3"
        md="4"
        sm="6"
        class="elevation-1 pa-1 d-flex align-center"
        style="max-height: 200px;"
      >
        <div
          style="height: 200px; min-width: 150px; flex-basis: 150px; overflow: hidden;"
          class="d-flex align-center justify-center"
        >
          <img
            :src="it.image"
            :alt="it.description"
            style="width: 100px;"
          >
        </div>
        <div class="pr-2">
           <span
             style="font-size: 0.8rem;"
           >
          {{ it.name }}
        </span>
        </div>
      </v-col>
    </v-row>
  </v-layout>
</template>

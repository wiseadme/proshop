<script lang="ts">
  import { defineComponent, useFetch, useRoute, unref } from '@nuxtjs/composition-api'
  import { useProductService } from '~/services/product.service'
  import { useCategoryService } from '~/services/category.service'

  export default defineComponent({
    name: 'category',
    setup() {
      const productService = useProductService()
      const categoryService = useCategoryService()
      const route = useRoute()

      if (!unref(navStore.state.categories)) {
        useFetch(async () => {
          await categoryService.fetchCategories()
          const { id } = unref(route).params
          const current = (unref(categoryService.categories)! as any[])!.find(it => it.url === id)

          await productService.fetchCategoryProducts(current._id)
        })
      }

      return {
        store
      }
    }
  })
</script>
<template>
  <v-layout>
    <v-row>
      <v-col v-for="it in store.state.products.value">
        {{ it.name }}
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
  import { defineComponent, useFetch, useRoute, unref } from '@nuxtjs/composition-api'
  import { useProductsStore } from '~/store/products'
  import { useNavigationStore } from '~/store/navigation'

  export default defineComponent({
    name: 'category',
    setup(){
      const store = useProductsStore()
      const navStore = useNavigationStore()
      const route = useRoute()

      if (!unref(navStore.state.categories)) {
        useFetch(async () => {
          await navStore.fetchCategories()
          const { id } = unref(route).params
          const current = (unref(navStore.state.categories)! as any[])!.find(it => it.url === id)

          await store.fetchCategoryProducts(current._id)
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

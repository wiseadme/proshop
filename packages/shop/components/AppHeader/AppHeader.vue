<script lang="ts">
  import { defineComponent, useFetch } from '@nuxtjs/composition-api'
  import { useCategoryService } from '~/services/category.service'

  export default defineComponent({
    setup(){
      const service = useCategoryService()

      useFetch(async () => await service.fetchCategories())

      return {
        service
      }
    }
  })
</script>
<template>
  <v-app-bar
    fixed
    app
    style="z-index: 2; max-height: 56px;"
  >
    <span>Категории</span>
  </v-app-bar>
</template>

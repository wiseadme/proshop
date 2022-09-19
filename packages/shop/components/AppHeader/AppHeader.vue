<script lang="ts">
  import { defineComponent, useFetch } from '@nuxtjs/composition-api'
  import { useNavigationStore } from '~/store/navigation'

  export default defineComponent({
    setup() {
      const store = useNavigationStore()

      useFetch(async () => await store.fetchCategories())

      return {
        store
      }
    }
  })
</script>
<template>
  <v-app-bar
    fixed
    app
    style="z-index: 2;"
  >
    <span>Категории</span>
  </v-app-bar>
</template>

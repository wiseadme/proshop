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
  <v-navigation-drawer
    permanent
    absolute
    style="z-index: 1;"
    class="elevation-2"
  >
    <v-list
      style="margin-top: 60px;"
      dense
      nav
    >
      <v-list-item
        v-for="item in store.state.categories.value"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

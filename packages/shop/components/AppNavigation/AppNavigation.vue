<script lang="ts">
  import { defineComponent, useFetch } from '@nuxtjs/composition-api'
  import { useCategoryService } from '~/services/category.service'

  export default defineComponent({
    setup() {
      const service = useCategoryService()

      useFetch(async () => await service.fetchCategories())

      return {
        service
      }
    }
  })
</script>
<template>
  <v-navigation-drawer
    permanent
    fixed
    style="z-index: 1;"
    class="elevation-2"
  >
    <v-list
      style="margin-top: 60px;"
      dense
      nav
    >
      <nuxt-link
        v-for="item in service.categories.value"
        :to="'/category/'+item.url"
        :key="item._id"
        class="nav-link"
        @click.native="service.category.value = item"
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>
<style lang="scss">
  @import "AppNavigation";
</style>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'

  export default defineComponent({
    name: 'main-layout',
    components: {
      AppHeader,
      AppNavigation,
    },
    setup(){
      return {}
    }
  })
</script>
<template>
  <app-header/>
  <app-navigation/>
  <v-main
    class="main-layout"
    style="padding: 66px 0 10px 56px"
  >
    <router-view />
  </v-main>
</template>
<style lang="scss">
</style>

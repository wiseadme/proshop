<script lang="ts">
  import { defineComponent } from 'vue'
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'

  export default defineComponent({
    components: { AppHeader, AppNavigation },
    setup(){
      return {}
    }
  })
</script>
<template>
  <v-app>
    <v-layout column>
      <app-header />
      <app-navigation />
      <v-main style="padding: 66px 0 10px 56px">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '../shared/assets/scss/main';
</style>

<script lang="ts" setup>
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'
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

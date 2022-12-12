<script setup lang="ts">
  import MainLayout from '@shared/layouts/MainLayout'
  import AuthLayout from '@shared/layouts/AuthLayout'

</script>
<template>
  <v-app class="grey lighten-4">
    <v-layout column>
      <main-layout v-if="!$route.path.includes('auth')"/>
      <auth-layout v-else/>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '@/shared/assets/scss/main';
</style>

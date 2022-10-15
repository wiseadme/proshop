<script lang="ts">
  import { defineComponent } from 'vue'
  import MainLayout from '@shared/layouts/MainLayout.vue'
  import AuthLayout from '@shared/layouts/AuthLayout.vue'

  export default defineComponent({
    components: {
      MainLayout,
      AuthLayout
    },
    setup(){
      return {}
    }
  })
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

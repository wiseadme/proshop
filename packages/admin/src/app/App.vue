<script setup lang="ts">
  import { useAuthService } from '@shared/services/auth.service'

  const authService = useAuthService()

  authService.check()
</script>
<template>
  <v-app class="grey lighten-4">
    <v-layout column>
      <router-view/>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '@/shared/assets/scss/main';
</style>

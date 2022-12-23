<script setup lang="ts">
  import { useAuthService } from '@shared/services/auth.service'
  import MainLayout from '@shared/layouts/MainLayout'
  import AuthLayout from '@shared/layouts/AuthLayout'

  const authService = useAuthService()

  authService.check().catch(() => authService.logout())

</script>
<template>
  <v-app class="grey lighten-4">
    <v-layout column>
      <main-layout v-if="authService.isAuthenticated"/>
      <auth-layout v-if="authService.isChecked && !authService.isAuthenticated"/>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '@/shared/assets/scss/main';
</style>

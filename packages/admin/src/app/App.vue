<script setup lang="ts">
  import { useAuthService } from '@shared/services/auth.service'
  import MainLayout from '@shared/layouts/MainLayout'
  import AuthLayout from '@shared/layouts/AuthLayout'

  const authService = useAuthService()

  const isNeedLogin = $computed(() => authService.isChecked && !authService.isAuthenticated)

  authService.check()
</script>
<template>
  <v-app class="grey lighten-4">
    <v-layout column>
      <main-layout v-if="authService.isAuthenticated"/>
      <auth-layout v-if="isNeedLogin"/>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  @import '@/shared/assets/scss/main';
</style>

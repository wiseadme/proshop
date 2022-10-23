<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { useAuthService } from '@shared/services/auth.service'
  // Components
  import { AppHeader } from '@app/components/AppHeader'
  import { AppNavigation } from '@app/components/AppNavigation'

  const router = useRouter()

  const authService = useAuthService()
  authService.setUserFromStorage().catch(() => router.push({ name: 'auth' }))

</script>
<template>
  <app-header/>
  <app-navigation/>
  <v-main
    class="main-layout"
    style="padding: 66px 0 10px 56px"
  >
    <router-view/>
  </v-main>
</template>
<style lang="scss">
</style>

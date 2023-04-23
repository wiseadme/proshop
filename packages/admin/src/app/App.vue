<script lang="ts" setup>
  import { onBeforeMount } from 'vue'
  import { useAuthService } from '@shared/services/auth.service'

  const authService = useAuthService()

  onBeforeMount(async () => {
    await authService.check()
  })

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

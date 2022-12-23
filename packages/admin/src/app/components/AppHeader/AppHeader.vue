<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useAuthService } from '@shared/services/auth.service'

  defineProps({
    customClass: {
      type: String,
      default: '',
    },
  })

  const authService = useAuthService()

</script>
<template>
  <v-toolbar
    fixed
    class="elevation-3"
  >
    <v-toolbar-logo>
    </v-toolbar-logo>
    <v-spacer/>
    <v-toolbar-items class="px-3">
      <div
        v-if="authService.user"
        class="d-flex justify-center align-center"
      >
        <v-icon
          icon="fas fa-user-circle"
          class="mx-2"
          size="24"
          color="green"
        />
        <h4 class="pb-1">
          {{ authService.user.displayName }}
        </h4>
      </div>
      <div>
        <v-icon
          class="mx-3"
          icon="fas fa-sign-out-alt"
          size="20"
          clickable
        />
      </div>
    </v-toolbar-items>
  </v-toolbar>
</template>
<style lang="scss">
  @import 'AppHeader';
</style>

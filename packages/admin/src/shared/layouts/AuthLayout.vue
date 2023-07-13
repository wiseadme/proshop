<script lang="ts" setup>
    import { useAuthService } from '@shared/composables/use-auth-service'

    const { user } = useAuthService()
</script>
<template>
    <v-main
        v-if="!user"
        class="auth-layout"
        style="height: 100vh"
    >
        <router-view/>
    </v-main>
</template>

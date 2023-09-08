<script lang="ts" setup>
    import { onBeforeMount } from 'vue'
    import { useAuthService } from '@shared/composables/use-auth-service'

    const { check } = useAuthService()

    onBeforeMount(async () => {
        await check()
    })

</script>
<template>
    <v-app class="grey lighten-4">
        <router-view/>
    </v-app>
</template>
<style lang="scss">
    @import '@/shared/assets/scss/main';
</style>

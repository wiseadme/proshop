<script setup lang="ts">
    import { useAuthService } from '@shared/composables/use-auth-service'
    import ProductLogo from '@shared/components/ProductLogo.vue'

    const { logout, user } = useAuthService()

</script>
<template>
    <v-toolbar
        fixed
        class="elevation-3"
        color="var(--secondary)"
        z-index="10"
    >
        <v-toolbar-logo>
            <product-logo/>
        </v-toolbar-logo>
        <v-spacer/>
        <v-toolbar-items class="px-3">
            <div
                v-if="user"
                class="d-flex justify-center align-center"
            >
                <v-icon
                    icon="fas fa-user-circle"
                    class="mx-2"
                    size="24"
                    color="white"
                />
                <h4 class="pb-1 white--text">
                    {{ user.username }}
                </h4>
            </div>
            <div>
                <v-icon
                    class="mx-3"
                    icon="fas fa-sign-out-alt"
                    size="20"
                    color="primary"
                    clickable
                    @click="logout"
                />
            </div>
        </v-toolbar-items>
    </v-toolbar>
</template>
<style lang="scss">
    @import 'AppHeader';
</style>

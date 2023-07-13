<script lang="ts" setup>
    import {
        computed,
        ref,
        unref
    } from 'vue'
    import { useAuthService } from '@shared/composables/use-auth-service'
    import { icons } from '@shared/enums/icons'
    import ProductLogo from '@shared/components/ProductLogo.vue'

    const {login} = useAuthService()

    const username = ref('')
    const password = ref('')
    const isPasswordHidden = ref(true)

    const passwordFieldType = computed(() => unref(isPasswordHidden) ? 'password' : 'text')
    const passwordToggleIcon = computed(() => unref(isPasswordHidden) ? icons.EYE_SLASH : icons.EYE)

    const loginUser = (validate) => {
        validate().then(() => login({ username: unref(username), password: unref(password) }))
    }
</script>
<template>
    <v-layout
        class="d-flex justify-center align-center"
        style="height: 100%"
    >
        <v-form v-slot="{validate}">
            <v-card
                elevation="2"
                color="white"
                style="border-radius: 12px"
            >
                <v-card-title>
                    <product-logo fill="var(--primary)"/>
                </v-card-title>
                <v-card-content>
                    <v-text-field
                        v-model="username"
                        label="логин"
                        :rules="[v => !!v || 'Необходимо заполнить']"
                        :prepend-icon="icons.AT"
                        tabindex="1"
                        placeholder="введите почту"
                        autocomplete="new-password"
                    />
                    <v-text-field
                        v-model="password"
                        label="пароль"
                        :rules="[v => !!v || 'Необходимо заполнить']"
                        :prepend-icon="icons.LOCK"
                        :type="passwordFieldType"
                        tabindex="2"
                        placeholder="введите пароль"
                        autocomplete="new-password"
                    >
                        <template #append-icon>
                            <v-icon
                                clickable
                                :icon="passwordToggleIcon"
                                @click="isPasswordHidden = !isPasswordHidden"
                            />
                        </template>
                    </v-text-field>
                </v-card-content>
                <v-card-actions>
                    <v-button
                        class="elevation-1 my-3 app-border-radius"
                        color="primary"
                        width="120"
                        tabindex="3"
                        @click="loginUser(validate)"
                    >
                        войти
                    </v-button>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-layout>
</template>

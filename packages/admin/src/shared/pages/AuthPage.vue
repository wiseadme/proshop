<script setup lang="ts">
  import { useAuthService } from '@shared/services/auth.service'
  import { icons } from '@shared/enums/icons'

  const service = useAuthService()

  let username = $ref('')
  let password = $ref('')
  let isPasswordHidden = $ref(true)

  const passwordFieldType = $computed(() => isPasswordHidden ? 'password' : 'text')
  const passwordToggleIcon = $computed(() => isPasswordHidden ? icons.EYE_SLASH : icons.EYE)

  const loginUser = (validate) => {
    validate().then(() => service.login({ username, password }))
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
      >
        <v-card-title>
          <v-icon
            :icon="icons.USER_CIRCLE"
            size="24"
            class="mr-2"
          />
          <h4>Авторизация</h4>
        </v-card-title>
        <v-card-content>
          <v-text-field
            v-model="username"
            label="логин"
            :rules="[v => !!v || 'Необходимо заполнить']"
            :prepend-icon="icons.AT"
            placeholder="введите почту"
            autocomplete="new-password"
          />
          <v-text-field
            v-model="password"
            label="пароль"
            :rules="[v => !!v || 'Необходимо заполнить']"
            :prepend-icon="icons.LOCK"
            :type="passwordFieldType"
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
            class="elevation-1"
            color="green"
            width="120"
            @click="loginUser(validate)"
          >
            войти
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>

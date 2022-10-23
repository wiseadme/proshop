<script lang="ts" setup>
  import { useAuthService } from '@shared/services/auth.service'

  const service = useAuthService()

  let username = $ref('')
  let password = $ref('')

  const loginUser = () => service.login({ username, password })

</script>
<template>
  <v-layout
    class="d-flex justify-center align-center"
    style="height: 100%"
  >
    <v-card
      elevation="2"
      color="white"
    >
      <v-card-title>
        <h4>Авторизация</h4>
      </v-card-title>
      <v-card-content>
        <v-form>
          <v-text-field
            v-model="username"
            label="логин"
            placeholder="введите почту"
          />
          <v-text-field
            v-model="password"
            label="пароль"
            placeholder="введите пароль"
          />
        </v-form>
      </v-card-content>
      <v-card-actions>
        <v-button
          class="elevation-1"
          @click="loginUser"
        >
          войти
        </v-button>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

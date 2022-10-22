<script lang="ts" setup>

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
            label="логин"
            placeholder="введите почту"
          />
          <v-text-field
            label="пароль"
            placeholder="введите пароль"
          />
        </v-form>
      </v-card-content>
      <v-card-actions>
        <v-button class="elevation-1">
          войти
        </v-button>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

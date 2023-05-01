<script lang="ts" setup>
  import { useMerchant } from '@modules/settings/composables/use-merchant'

  const {model} = useMerchant()
</script>
<template>
  <v-card style="width: 100%">
    <v-card-title class="primary--text">
      Контакты
    </v-card-title>
    <v-card-content>
      <v-text-field
        v-model="model.email"
        :rules="[val => !!val]"
        label="Почта *"
      />
      <v-text-field
        v-model="model.phone"
        :rules="[val => !!val]"
        label="Телефон *"
        placeholder="+998 99 999 99 99"
      />
      <v-text-field
        v-model="model.address"
        :rules="[val => !!val]"
        label="Адрес *"
      />
    </v-card-content>
  </v-card>
</template>

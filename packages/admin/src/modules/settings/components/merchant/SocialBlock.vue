<script lang="ts" setup>
  import { useMerchant } from '@modules/settings/composables/use-merchant'

  const { model } = useMerchant()
</script>
<template>
  <v-card style="width: 100%">
    <v-card-title class="primary--text">
      Социальные сети
    </v-card-title>
    <v-card-content>
      <v-text-field
        v-model="model.social.vk"
        label="vk"
      />
      <v-text-field
        v-model="model.social.facebook"
        label="facebook"
      />
      <v-text-field
        v-model="model.social.instagram"
        label="instagram"
      />
    </v-card-content>
  </v-card>
</template>

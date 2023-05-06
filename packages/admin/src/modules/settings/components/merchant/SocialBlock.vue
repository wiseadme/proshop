<script lang="ts" setup>
  import {
    ref,
    unref,
    watch
  } from 'vue'
  import { useMerchant } from '@modules/settings/composables/use-merchant'
  import { IMerchantSocial } from '@ecommerce-platform/types'

  const { model } = useMerchant()

  const social = ref<IMerchantSocial>({
    vk: '',
    facebook: '',
    instagram: ''
  })

  watch(social, (to) => {
    unref(model).social = to
  }, {deep: true})
</script>
<template>
  <v-card style="width: 100%">
    <v-card-title class="primary--text">
      Социальные сети
    </v-card-title>
    <v-card-content>
      <v-text-field
        v-model="social.vk"
        label="vk"
      />
      <v-text-field
        v-model="social.facebook"
        label="facebook"
      />
      <v-text-field
        v-model="social.instagram"
        label="instagram"
      />
    </v-card-content>
  </v-card>
</template>

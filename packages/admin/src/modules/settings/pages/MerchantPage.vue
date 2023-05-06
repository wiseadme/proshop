<script lang="ts" setup>
  import OrganizationBlock from '@modules/settings/components/merchant/OrganizationBlock.vue'
  import CurrenciesBlock from '@modules/settings/components/merchant/CurrenciesBlock.vue'
  import ContactsBlock from '@modules/settings/components/merchant/ContactsBlock.vue'
  import SocialBlock from '@modules/settings/components/merchant/SocialBlock.vue'
  import { useMerchant } from '@modules/settings/composables/use-merchant'
  import { computed, unref } from 'vue'

  const { createMerchant, getMerchantSettings, updateMerchant, isEditMode } = useMerchant()

  const buttonLabel = computed(() => unref(isEditMode) ? 'Сохранить' : 'Изменить')

  const onSubmit = (validate) => {
    validate()
      .then(() => {
        if (unref(isEditMode)) {
          updateMerchant()
        } else {
          createMerchant()
        }
      })
  }

  getMerchantSettings()
</script>
<template>
  <v-layout>
    <v-form
      v-slot="{validate}"
      style="width: 100%"
    >
      <v-card
        elevation="2"
        style="width: 100%"
        color="white"
        class="app-border-radius"
      >
        <v-card-content>
          <v-row>
            <v-col cols="6">
              <OrganizationBlock/>
            </v-col>
            <v-col cols="4">
              <CurrenciesBlock/>
            </v-col>
            <v-col
              cols="6"
              class="mt-4"
            >
              <ContactsBlock/>
              <SocialBlock/>
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-button
            color="primary"
            class="ml-7 mb-7 px-4"
            elevation="2"
            rounded
            @click="onSubmit(validate)"
          >
            {{ buttonLabel }}
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>
<style lang="scss">
  @import "vue-color-kit/dist/vue-color-kit.css";
</style>

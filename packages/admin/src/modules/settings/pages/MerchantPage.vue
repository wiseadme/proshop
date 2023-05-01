<script lang="ts" setup>
  import OrganizationBlock from '@modules/settings/components/merchant/OrganizationBlock.vue'
  import CurrenciesBlock from '@modules/settings/components/merchant/CurrenciesBlock.vue'
  import ContactsBlock from '@modules/settings/components/merchant/ContactsBlock.vue'
  import { useMerchant } from '@modules/settings/composables/use-merchant'

  const {createNewMerchant} = useMerchant()
  const onCreate = (validate) => {
    return validate().then(createNewMerchant)
  }

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
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-button
            color="primary"
            class="ml-7 mb-7 px-4"
            elevation="2"
            rounded
            @click="onCreate(validate)"
          >
            Сохранить
          </v-button>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>
<style lang="scss">
  @import "vue-color-kit/dist/vue-color-kit.css";
</style>

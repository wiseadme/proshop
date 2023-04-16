<script lang="ts">
  import { defineComponent } from 'vue'
  import { getProductConditionTitle } from '@modules/product/helpers'
  import { useProduct } from '@modules/product/composables/use-product'

  export default defineComponent({
    name: 'product-conditions-block',
    setup() {
      const { model } = useProduct()

      return {
        model,
        getProductConditionTitle
      }
    }
  })

</script>
<template>
  <v-row class="mt-2 pa-4 white elevation-2 app-border-radius">
    <v-col class="block-head pb-6 mb-8">
      <h2 class="block-head__title">
        Состояния товара
      </h2>
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="model.conditions.countable"
        :label="getProductConditionTitle('countable')"
      />
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="model.conditions.exists"
        :label="getProductConditionTitle('exists')"
      />
    </v-col>
    <v-col
      xl="2"
      lg="4"
      md="6"
      sm="12"
    >
      <v-checkbox
        v-model="model.conditions.visible"
        :label="getProductConditionTitle('visible')"
      />
    </v-col>
  </v-row>
</template>

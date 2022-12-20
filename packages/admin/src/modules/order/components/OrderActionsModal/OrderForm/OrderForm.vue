<script setup lang="ts">
  import { PropType } from 'vue'
  import { IOrder, ICartItem } from '@ecommerce-platform/types/index'

  defineProps({
    orderId: {
      type: [ String, Number ],
      default: null
    },
    client: {
      type: Object as PropType<IOrder['client']>,
      default: null
    },
    items: {
      type: Array as PropType<ICartItem[]>,
      default: null
    },
    status: {
      type: Object as PropType<IOrder['status']>
    },
    qrcode: {
      type: String,
      default: null
    }
  })

</script>
<template>
  <v-form v-slot="{validate}">
    <v-card
      class="elevation-3"
      width="100%"
      color="rgba(0,0,0,.4)"
    >
      <v-card-title class="card-title white--text text--base">
        Форма заказа
      </v-card-title>
      <v-card-content>
        <v-layout>
          <v-row>
            <v-col></v-col>
          </v-row>
        </v-layout>
      </v-card-content>
      <v-card-actions>
        <v-button @click="validate">
          создать
        </v-button>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

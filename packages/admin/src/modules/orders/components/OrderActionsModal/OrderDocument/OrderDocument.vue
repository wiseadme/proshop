<script setup lang="ts">
  import { watch } from 'vue'
  import { ICartItem } from '@ecommerce-platform/types'
  import AddressMap from '../AddressMap/AddressMap.vue'

  const props = defineProps({
    order: {
      type: Object,
      default: null
    },
    users: {
      type: Array,
      default: null
    }
  })

  const emit = defineEmits([
    'close',
    'update:order'
  ])

  const computedExecutor = $computed({
    get: () => props.order.executor,
    set: (val) => {
      emit('update:order', { executor: val._id })
    }
  })

  watch(computedExecutor, to => {
    console.log(to)
  })

  const getProductPrice = (item: ICartItem) => {
    return item.variant?.option?.price || item.product.price
  }

  // const onSelectExecutor = (value) => {
  //   emit('update:order', { executor: value._id })
  // }

  const onClose = () => {
    emit('close')
  }
</script>
<template>
  <v-card
    class="elevation-3"
    width="100%"
    color="rgba(0,0,0,.4)"
  >
    <v-card-title class="card-title white--text text--base">
      Заказ № {{ order.orderId }}
    </v-card-title>
    <v-card-content
      class="grey lighten-4"
      style="max-height: 70vh; overflow: auto"
    >
      <v-row>
        <v-col
          cols="3"
          class="d-flex justify-center align-start"
        >
          <img
            v-if="order"
            :src="order.qrcode"
            alt=""
            style="width: 100%; max-width: 200px"
            class="elevation-1"
          >
        </v-col>
        <v-col cols="9">
          <address-map
            class="elevation-2"
            :coords="order.address.coords"
            :address="order.address.address"
          />
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col>
          <v-list class="elevation-1">
            <v-list-item class="elevation-1 green white--text">
              <v-list-item-icon/>
              <v-list-item-content style="width: 250px">
                <h4>Наименование</h4>
              </v-list-item-content>
              <v-list-item-content style="width: 120px">
                <h4>Цена за шт</h4>
              </v-list-item-content>
              <v-list-item-content style="width: 80px">
                <h4>Кол-во</h4>
              </v-list-item-content>
              <v-list-item-content style="width: 80px">
                <h4>Всего</h4>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(it, i) in order.items"
              :key="it.product._id"
              style="border-bottom: 1px solid #dcdcdc"
            >
              <v-list-item-icon>
                <span>{{ i + 1 }}</span>
              </v-list-item-icon>
              <v-list-item-content style="width: 250px">
                <span>{{ it.product.name }}</span>
              </v-list-item-content>
              <v-list-item-content style="width: 120px">
                <span>{{ getProductPrice(it) }}</span>
              </v-list-item-content>
              <v-list-item-content style="width: 80px">
                <span>{{ it.quantity }}</span>
              </v-list-item-content>
              <v-list-item-content style="width: 80px">
                <span>{{ getProductPrice(it) * it.quantity }}</span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="elevation-1 grey lighten-2">
              <v-list-item-icon/>
              <v-list-item-content>
                <h4>Итого к оплате: {{ order.amount }}</h4>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col>
          <v-list class="elevation-1">
            <v-list-item class="green white--text">
              <v-list-item-icon/>
              <v-list-item-content style="width: 250px">
                <h4>Заказчик</h4>
              </v-list-item-content>
              <v-list-item-content style="width: 180px">
                <h4>Телефон</h4>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon/>
              <v-list-item-content style="width: 250px">
                {{ order.customer.name }}
              </v-list-item-content>
              <v-list-item-content style="width: 180px">
                {{ order.customer.phone }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="mt-4 px-2">
        <v-col
          cols="6"
          class="white elevation-2 pa-2"
        >
          <v-select
            v-model="computedExecutor"
            label="Исполнитель заказа"
            :items="users"
            value-key="firstName"
          />
        </v-col>
      </v-row>
    </v-card-content>
    <v-card-actions>
      <v-button
        color="orange"
        elevation="2"
        @click="onClose"
      >
        закрыть
      </v-button>
    </v-card-actions>
  </v-card>
</template>

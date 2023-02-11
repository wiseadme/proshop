<script setup lang="ts">
  import { ICartItem } from '@ecommerce-platform/types'
  import AddressMap from '@modules/orders/components/OrderActionsModal/AddressMap/AddressMap.vue'
  import { status } from '@modules/orders/enums/status'
  import { useNotifications } from '@shared/components/VNotifications/use-notifications'

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

  const processStatuses = [ 'inProcess', 'ready', 'completed' ]

  const { notify } = useNotifications()

  const computedExecutor = $computed({
    get: () => props.order.executor,
    set: (val) => {
      emit('update:order', { executor: val._id })
    }
  })

  const checkStatusKey = (key) => {
    return ((processStatuses.indexOf(key) > -1) && !computedExecutor)
  }

  const getProductPrice = (item: ICartItem) => {
    return item.variant?.option?.price || item.product.price
  }

  const changeOrderStatus = (statusKey) => {
    const { status: statuses } = props.order

    if (statuses[statusKey]) {
      return notify({
        title: 'Информация',
        text: `Заказ уже имеет статус "${ status[statusKey] }"`,
        type: 'warning',
        closeOnClick: true,
      })
    }

    if (checkStatusKey(statusKey)) {
      return notify({
        title: 'Информация',
        text: 'Необходимо выбрать исполнителя заказа',
        type: 'warning',
        closeOnClick: true,
      })
    }

    if (statusKey === 'completed' && !statuses.ready) {
      return
    }

    statuses[statusKey] = true

    return emit('update:order', { status: statuses })
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
            :address="order.address.text"
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
      <v-row
        class="mt-4 mx-2 statuses white elevation-2"
        style="overflow: hidden"
      >
        <template
          v-for="it in Object.keys(order.status)"
          :key="it"
        >
          <v-col
            v-if="it !== 'cancelled'"
            class="pa-2 d-flex justify-center align-center statuses__step"
            :class="{['statuses__step--done']: order.status[it]}"
            xl="2"
            lg="4"
            md="6"
            sm="12"
          >
            <div
              v-if="it !== 'cancelled'"
              class="px-2 py-3 d-flex justify-center align-center flex-column"
            >
              <v-chip
                class="mb-5 px-1 elevation-1 grey--text text--darken-3"
                color="white"
              >
                <span>{{ status[it] }}</span>
              </v-chip>
              <v-button
                class="elevation-2 my-1"
                :color="!order.status[it] ? 'grey lighten-2' : 'primary'"
                round
                @click="changeOrderStatus(it)"
              >
                <v-icon
                  size="14"
                  :icon="order.status[it] ? 'fas fa-check' : 'fas fa-power-off'"
                />
              </v-button>
            </div>
          </v-col>
        </template>
      </v-row>
      <v-row class="mt-4 px-2">
        <v-col
          cols="6"
          class="white elevation-2 pa-2 d-flex"
        >
          <v-select
            v-model="computedExecutor"
            :items="users"
            :disabled="order.status.inProcess"
            label="Исполнитель"
            prepend-icon="fas fa-user-tie"
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
<style lang="scss">
  .statuses__step {
    position: relative;

    &--done {
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--primary);
        top: 68%;
        left: 50%;
        transform: translateY(-50%);
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--primary);
        top: 68%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }

  .v-button {
    z-index: 1;
  }
</style>

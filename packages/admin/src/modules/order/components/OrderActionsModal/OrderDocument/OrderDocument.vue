<script lang="ts">
  import { defineComponent, unref } from 'vue'
  import AddressMap from '@modules/order/components/OrderActionsModal/AddressMap/AddressMap.vue'
  import { OrderStatuses, OrderProcessStatuses } from '@modules/order/enums/status'
  import { useNotifications } from '@shared/components/VNotifications/use-notifications'
  import { useOrders } from '@modules/order/composables/use-orders'
  import { ICartItem } from '@ecommerce-platform/types'

  export default defineComponent({
    name: 'order-document',
    components: { AddressMap },
    props: {
      users: {
        type: Array,
        default: null
      }
    },
    emits: [ 'close', 'update:order' ],
    setup(props, { emit }) {
      const { model, order, onUpdateOrder } = useOrders()
      const { notify } = useNotifications()

      const checkProcessStatusKey = (key: string) => (OrderProcessStatuses[key] && !unref(model).executor)
      const getProductPrice = (item: ICartItem) => item.variant?.option?.price || item.product.price

      const changeOrderStatus = (statusKey) => {
        const { status: statuses, executor } = unref(model)

        if (statuses[statusKey]) {
          return notify({
            title: 'Информация',
            text: `Заказ уже имеет статус "${ OrderStatuses[statusKey] }"`,
            type: 'warning',
            closeOnClick: true,
          })
        }

        if (checkProcessStatusKey(statusKey)) {
          return notify({
            title: 'Информация',
            text: 'Необходимо выбрать исполнителя заказа',
            type: 'warning',
            closeOnClick: true,
          })
        }

        if (
          statusKey === OrderProcessStatuses.ready && !statuses.inProcess
          || statusKey === OrderProcessStatuses.completed && !statuses.ready
        ) {
          return
        }

        statuses[statusKey] = true

        return onUpdateOrder(Object.assign({}, { status: statuses }, executor ? { executor } : {}))

      }

      const onClose = () => emit('close')

      return {
        model,
        order,
        OrderStatuses,
        OrderProcessStatuses,
        onClose,
        changeOrderStatus,
        getProductPrice,
      }
    }
  })

</script>
<template>
  <v-card
    v-if="model._id"
    class="elevation-3"
    width="100%"
    color="rgba(0,0,0,.4)"
  >
    <v-card-title class="card-title white--text text--base">
      Заказ № {{ model.orderId }}
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
            v-if="model.qrcode"
            :src="model.qrcode"
            alt=""
            style="width: 100%; max-width: 200px"
            class="elevation-1"
          >
        </v-col>
        <v-col cols="9">
          <address-map
            class="elevation-2"
            :coords="model.delivery.coords"
            :address="model.delivery.address"
          />
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col>
          <v-list class="elevation-1">
            <v-list-item class="elevation-1 primary white--text">
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
              v-for="(it, i) in model.items"
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
                <h4>Итого к оплате: {{ model.amount }}</h4>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col>
          <v-list class="elevation-1">
            <v-list-item class="primary white--text">
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
                {{ model.customer.name }}
              </v-list-item-content>
              <v-list-item-content style="width: 180px">
                {{ model.customer.phone }}
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
          v-for="it in Object.keys(model.status)"
          :key="it"
        >
          <v-col
            v-if="it !== 'cancelled'"
            class="pa-2 d-flex justify-center align-center statuses__step"
            :class="{
              ['statuses__step--done-after']: model.status[it] && it !== OrderProcessStatuses.completed,
              ['statuses__step--done-before']: model.status[it],
            }"
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
                <span>{{ OrderStatuses[it] }}</span>
              </v-chip>
              <v-button
                class="elevation-2 my-1"
                :color="!model.status[it] ? 'grey lighten-2' : 'primary'"
                round
                @click="changeOrderStatus(it)"
              >
                <v-icon
                  size="14"
                  :icon="model.status[it] ? 'fas fa-check' : 'fas fa-power-off'"
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
            v-model="model.executor"
            :items="users"
            :disabled="model.status.inProcess"
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
      &-before {
        &:before {
          content: "";
          position: absolute;
          width: 50%;
          height: 2px;
          background-color: var(--primary);
          top: 68%;
          left: 0;
          transform: translateY(-50%);
        }
      }

      &-after {
        &:after {
          content: "";
          position: absolute;
          width: 50%;
          height: 2px;
          background-color: var(--primary);
          top: 68%;
          left: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .v-button {
    z-index: 1;
  }
</style>

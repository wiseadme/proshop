<script lang="ts" setup>
    import {
        computed,
        onBeforeMount,
        unref,
    } from 'vue'

    import { useOrderDeps } from '@modules/orders/composables/view/use-order-deps'
    import { useOrderModel } from '@modules/orders/composables/view/use-order-model'
    import { useOrders } from '@modules/orders/composables/view/use-orders'

    import { useNotifications } from '@shared/components/VNotifications/use-notifications'

    import AddressMap from '@modules/orders/components/OrderActionsModal/AddressMap/AddressMap.vue'

    import { OrderProcessStatuses, OrderStatuses } from '@modules/orders/enums/status'

    defineEmits<{ (e: 'close'): void }>()

    const { onUpdateOrder } = useOrders()
    const { model } = useOrderModel()
    const { users, fetchUsers } = useOrderDeps()
    const { notify } = useNotifications()

    const statuses = computed(() => Object.keys(unref(model).status))

    const isExecutorExists = (key: string) => (OrderProcessStatuses[key] && !unref(model).executor)

    const onChangeOrderStatus = (statusKey: string) => {
        const { status, executor } = unref(model)

        if (status[statusKey]) {
            return notify({
                title: 'Информация',
                text: `Заказ уже имеет статус "${OrderStatuses[statusKey]}"`,
                type: 'warning',
                closeOnClick: true,
            })
        }

        if (isExecutorExists(statusKey)) {
            return notify({
                title: 'Информация',
                text: 'Необходимо выбрать исполнителя заказа',
                type: 'warning',
                closeOnClick: true,
            })
        }

        if (statusKey === OrderProcessStatuses.ready && !status.inProcess
            || statusKey === OrderProcessStatuses.completed && !status.ready
        ) {
            return
        }

        status[statusKey] = true

        return onUpdateOrder(Object.assign({}, { status }, executor ? { executor } : {}))
    }

    const onCancelOrder = () => {
        const { status, id } = unref(model)
        status.cancelled = true

        onUpdateOrder({ status, id })
    }

    onBeforeMount(() => {
        if (!unref(users).length) {
            fetchUsers()
        }
    })
</script>
<template>
    <v-card
        v-if="model.id"
        class="elevation-2 app-border-radius"
        width="100%"
        color="white"
    >
        <v-card-title
            style="width: 100%; justify-content: space-between"
            class="white primary--text elevation-2"
        >
            <div class="order-header-left d-flex align-center">
                <div
                    style="width: 100px; height: 100px"
                    v-html="model.qrcode"
                />
                <div>
                    <h5>Заказ № {{ model.orderId }}</h5>
                </div>
            </div>
            <div class="order-header-right">
                <v-button
                    class="app-border-radius"
                    label="Отменить заказ"
                    elevation="2"
                    color="error"
                    @click="onCancelOrder"
                />
            </div>
        </v-card-title>
        <v-card-content
            class="grey lighten-4"
            style="max-height: 70vh; overflow: auto; z-index: 1"
        >
            <v-row>
                <v-col cols="12">
                    <address-map
                        class="app-border-radius"
                        :coords="model.delivery!.coords"
                        :address="model.delivery!.address"
                    />
                </v-col>
            </v-row>
            <v-row class="mt-2">
                <v-col>
                    <v-list class="app-border-radius">
                        <v-list-item class="secondary white--text">
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
                            :key="it.product.id"
                            style="border-bottom: 1px solid #dcdcdc; height: 80px"
                        >
                            <v-list-item-icon>
                                <span>{{ i + 1 }}</span>
                            </v-list-item-icon>
                            <v-list-item-content style="width: 250px">
                                <span>{{ it.product.name }}</span>
                            </v-list-item-content>
                            <v-list-item-content style="width: 120px">
                                <span>{{ it.product.price }}</span>
                            </v-list-item-content>
                            <v-list-item-content style="width: 80px">
                                <span>{{ it.quantity }}</span>
                            </v-list-item-content>
                            <v-list-item-content style="width: 80px">
                                <span>{{ it.product.price * it.quantity }}</span>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="grey lighten-2">
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
                    <v-list class="app-border-radius">
                        <v-list-item class="secondary white--text">
                            <v-list-item-icon/>
                            <v-list-item-content style="width: 250px">
                                <h4>Заказчик</h4>
                            </v-list-item-content>
                            <v-list-item-content style="width: 180px">
                                <h4>Телефон</h4>
                            </v-list-item-content>
                            <v-list-item-content style="width: 180px">
                                <h4>Адрес</h4>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item style="height: 80px">
                            <v-list-item-icon/>
                            <v-list-item-content style="width: 250px">
                                {{ model.customer?.name }}
                            </v-list-item-content>
                            <v-list-item-content style="width: 180px">
                                {{ model.customer?.phone }}
                            </v-list-item-content>
                            <v-list-item-content style="width: 180px">
                                {{ model.delivery?.address }}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row
                class="mt-4 mx-2 statuses white app-border-radius"
                style="overflow: hidden"
            >
                <template v-for="it in statuses">
                    <v-col
                        v-if="it !== 'cancelled'"
                        :key="it"
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
                                :color="!model.status[it] ? 'grey lighten-2' : 'success'"
                                style="z-index: 1"
                                round
                                @click="onChangeOrderStatus(it)"
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
                    class="white pa-2 d-flex app-border-radius"
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
                color="secondary"
                elevation="2"
                class="app-border-radius"
                width="120"
                @click="$emit('close')"
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
                    height: 1px;
                    background-color: var(--secondary);
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
                    height: 1px;
                    background-color: var(--secondary);
                    top: 68%;
                    left: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>

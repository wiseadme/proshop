<script setup lang="ts">
  import OrdersTable from '@modules/orders/components/OrdersTable'
  import OrderActionsModal from '@modules/orders/components/OrderActionsModal'
  import { useOrdersService } from '@modules/orders/service/order.service'
  import { getOrderStatusName } from '@modules/orders/helpers'

  const service = useOrdersService()

  await Promise.all([
    service.getOrders(),
    service.getUsers()
  ])

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center',
      width: '150'
    },
    {
      key: 'createdAt',
      title: 'Дата создания',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => new Date(row.createdAt).toLocaleString(),
      emit: true
    },
    {
      key: 'orderId',
      title: 'Номер заказа',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.orderId
    },
    {
      key: 'amount',
      title: 'Сумма заказа',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.amount,
      emit: true
    },
    {
      key: 'status',
      title: 'Статус заказа',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => getOrderStatusName(row.status)
    },
    {
      key: 'qrcode',
      title: 'QRCode',
      width: '150',
      align: 'left',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.qrcode
    }
  ])

  let openOrderModal = $ref(false)
  let isUpdate = $ref(false)
  let isRead = $ref(false)

  const onOpenOrder = (order) => {
    service.setAsCurrent(order)

    openOrderModal = true
    isRead = true
    isUpdate = false

    if (!order.status.seen) {
      service.updateOrder({
        _id: order._id,
        status: {
          ...order.status,
          seen: true
        }
      })
    }
  }

  const onUpdateTablePage = (page) => {
    console.log(page)
  }

  const onUpdateTableRowsCount = (count) => {
    console.log(count)
  }

  const onSort = (col) => {
    console.log(col)
  }

  const onAddOrder = () => {
    openOrderModal = true
    isRead = false
    isUpdate = false
  }

  const onDeleteOrder = (order) => {
    service.deleteOrder(order._id)
  }

  const onUpdateOrder = (updates) => {
    service.updateOrder(updates).then(res => service.setAsCurrent(res))
  }

</script>
<template>
  <v-row>
    <v-col>
      <orders-table
        :cols="cols"
        :rows="service.orders"
        @sort:column="onSort"
        @open:order="onOpenOrder"
        @add:order="onAddOrder"
        @delete:order="onDeleteOrder"
        @update:page="onUpdateTablePage"
        @update:rows-count="onUpdateTableRowsCount"
      />
      <order-actions-modal
        v-model="openOrderModal"
        :order="service.order"
        :users="service.users"
        :is-update="isUpdate"
        :is-read="isRead"
        @update:order="onUpdateOrder"
        @close="openOrderModal = false"
      />
    </v-col>
  </v-row>
</template>

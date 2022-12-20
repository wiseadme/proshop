<script setup lang="ts">
  import { OrdersTable } from '@modules/order/components/OrdersTable'
  import { OrderActionsModal } from '@modules/order/components/OrderActionsModal'
  import { useOrdersService } from '@modules/order/service/order.service'
  import { getOrderStatusName } from '@modules/order/helpers'

  const service = useOrdersService()

  await service.getOrders()

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center',
      width: '250'
    },
    {
      key: 'createdAt',
      title: 'Дата создания',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => new Date(row.createdAt).toLocaleString()
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
      format: (row) => row.amount + ' руб'
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

    service.updateOrder({
      _id: order._id,
      status: {
        ...order.status,
        seen: true
      }
    })
  }

  const onUpdateTablePage = (page) => {
    console.log(page)
  }

  const onUpdateTableRowsCount = (count) => {
    console.log(count)
  }

  const onAddOrder = () => {
    openOrderModal = true
    isRead = false
    isUpdate = false
  }

  const onDeleteOrder = (order) => {
    service.deleteOrder(order._id)
  }

</script>
<template>
  <v-row>
    <v-col>
      <orders-table
        :cols="cols"
        :rows="service.orders"
        @open:order="onOpenOrder"
        @add:order="onAddOrder"
        @delete:order="onDeleteOrder"
        @update:page="onUpdateTablePage"
        @update:rows-count="onUpdateTableRowsCount"
      />
      <order-actions-modal
        v-model="openOrderModal"
        :order="service.order"
        :is-update="isUpdate"
        :is-read="isRead"
        @close="openOrderModal = false"
      />
    </v-col>
  </v-row>
</template>

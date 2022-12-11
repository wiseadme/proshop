<script setup lang="ts">
  import { useOrdersService } from '@modules/order/service/order.service'
  import { OrdersTable } from '@modules/order/components/OrdersTable'
  import { Status } from '@shared/enums/order-statuses'

  const service = useOrdersService()

  await service.getOrders()

  const getOrderStatusName = (status): string => {
    if (status.created || status.seen) {
      return Status.CREATED
    }

    if (status.confirmed) {
      return Status.CONFIRMED
    }

    if (status.inProcess) {
      return Status.IN_PROCESS
    }

    if (status.ready) {
      return Status.READY
    }

    if (status.completed) {
      return Status.COMPLETED
    }

    if (status.cancelled) {
      return Status.CANCELED
    }

    return ''
  }

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center'
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

</script>
<template>
  <v-row>
    <v-col>
      <orders-table
        :cols="cols"
        :rows="service.orders"
      />
    </v-col>
  </v-row>
</template>

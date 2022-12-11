<script setup lang="ts">
  import { onBeforeUnmount, onMounted } from 'vue'
  import { useOrdersService } from '@modules/order/service/order.service'
  import { OrdersTable } from '@modules/order/components/OrdersTable'
  import { usePolling } from '@shared/composables/use-polling'

  const service = useOrdersService()

  await service.getOrders()

  const getOrderStatusName = (status): string => {
    if (status.created) {
      return 'создано'
    }

    if (status.confirmed) {
      return 'заказ подтвержден'
    }

    if (status.inProcess) {
      return 'в работе'
    }

    if (status.ready) {
      return 'готов'
    }

    if (status.completed) {
      return 'выполнен'
    }

    if (status.cancelled) {
      return 'отменен'
    }

    return ''
  }

  const { stopPolling, startPolling } = usePolling({
    handler: () => service.getOrders(),
    timeout: 5000
  })

  onMounted(() => {
    startPolling()
  })

  onBeforeUnmount(() => {
    stopPolling()
  })

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

import { ref } from 'vue'
import { getOrderStatusName } from '@modules/order/helpers'
import { useOrdersService } from '@modules/order/composables/use-orders-service'

export const useOrdersTable = () => {
  const {
    pagination,
    getOrders,
  } = useOrdersService()

  const onUpdateTablePage = (page) => {
    console.log(page)
  }

  const onUpdateTableRowsCount = (count) => {
    pagination.setItemsCount(count)

    return getOrders()
  }

  const onSort = (col) => {
    console.log(col)
  }

  const cols = ref([
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

  return {
    cols,
    onUpdateTablePage,
    onUpdateTableRowsCount,
    onSort
  }
}

import { ref } from 'vue'

import { useOrdersService } from '@modules/orders/composables/use-orders-service'

import { getOrderStatusName } from '@modules/orders/helpers'

export const useOrdersTable = () => {
    const {
        pagination,
        sort,
        getOrders,
    } = useOrdersService()

    const onUpdateTablePage = (page) => {
        pagination.setPage(page)

        return getOrders()
    }

    const onUpdateTableRowsCount = (count) => {
        pagination.setPage(1)
        pagination.setItemsCount(count)

        return getOrders()
    }

    const onSortColumn = (col) => {
        const { sorted } = col
        sorted ? sort.setAsc(col.key) : sort.setDesc(col.key)

        return getOrders()
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
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'orderId',
            title: 'Номер заказа',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.orderId,
            onSort: (col) => onSortColumn(col)
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
            format: (row) => getOrderStatusName(row.status),
            onSort: (col) => onSortColumn(col)
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
        onSortColumn
    }
}

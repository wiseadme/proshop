import { ref } from 'vue'

import { useOrdersService } from '@modules/orders/composables/service/use-orders-service'

import type { IOrder } from '@proshop-app/types'

import { getOrderStatusName } from '@modules/orders/helpers'

export const useOrdersTable = () => {
    const {
        pagination,
        sort,
        getOrders,
    } = useOrdersService()

    const onUpdateTablePage = (page: number) => {
        pagination.setPage(page)

        return getOrders()
    }

    const onUpdateTableRowsCount = (count: number) => {
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
            format: (row: IOrder) => new Date(row.createdAt!).toLocaleString(),
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'orderId',
            title: 'Номер заказа',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IOrder) => row.orderId,
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'amount',
            title: 'Сумма заказа',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IOrder) => row.amount,
            emit: true
        },
        {
            key: 'status',
            title: 'Статус заказа',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IOrder) => getOrderStatusName(row.status),
            onSort: (col) => onSortColumn(col)
        },
        {
            key: 'executor',
            title: 'Исполнитель',
            width: '150',
            align: 'left',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row: IOrder) => row.executor
        }
    ])

    return {
        cols,
        onUpdateTablePage,
        onUpdateTableRowsCount,
        onSortColumn
    }
}

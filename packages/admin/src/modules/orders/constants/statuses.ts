import { OrderStatus } from '@modules/orders/enums/status'

export const orderStatusLabels = {
    [OrderStatus.CREATED]: 'Новый заказ',
    [OrderStatus.SEEN]: 'Просмотрен',
    [OrderStatus.CONFIRMED]: 'Подтвержден',
    [OrderStatus.IN_PROCESS]: 'В работе',
    [OrderStatus.READY]: 'Готов',
    [OrderStatus.IN_DELIVERY]: 'В доставке',
    [OrderStatus.COMPLETED]: 'Выполнен',
    [OrderStatus.CANCELLED]: 'Отменен'
}

export const orderStatusSteps = [
    OrderStatus.CREATED,
    OrderStatus.SEEN,
    OrderStatus.CONFIRMED,
    OrderStatus.IN_PROCESS,
    OrderStatus.READY,
    OrderStatus.IN_DELIVERY,
    OrderStatus.COMPLETED
]

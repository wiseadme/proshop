import { OrderTypes } from '@modules/orders/di/di.types'
import { IOrdersQueue, OrdersQueue } from '@modules/orders/queue/queue'
import { container } from '@common/dependencies'

container.bind<IOrdersQueue>(OrderTypes.ORDERS_QUEUE).to(OrdersQueue)

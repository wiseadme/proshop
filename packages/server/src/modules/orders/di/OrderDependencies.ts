import { ORDER_IOC } from '@modules/orders/di/di.types'
// import { IOrdersQueue, OrdersQueue } from '@modules/orders/queue/queue'
import { Container } from 'inversify'
import { IOrdersService } from '@modules/orders/types/service'
import { TYPES } from '@common/schemes/di-types'
import { OrdersService } from '@modules/orders/service/orders.service'
import { IController } from '@/types'
import { OrdersController } from '@modules/orders/controller/orders.controller'
import { IOrdersRepository } from '@modules/orders/types/repository'
import { OrdersRepository } from '@modules/orders/repository/orders.repository'
import { GatewayService as OrderGateway, IOrderGatewayService } from '@modules/orders/gateway/gateway.service'
import { OrdersMiddlewares, IOrdersMiddlewares } from '@modules/orders/middleware/middlewares'
import { type IOrdersHelpers, OrdersHelpers } from '@modules/orders/helpers/orders.helpers'

export class OrderDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(OrdersController)
        this.#container.bind<IOrdersService>(ORDER_IOC.IOrdersService).to(OrdersService)
        this.#container.bind<IOrdersRepository>(ORDER_IOC.IOrdersRepository).to(OrdersRepository)
        // this.#container.bind<IOrdersQueue>(ORDER_IOC.IOrdersQueue).to(OrdersQueue).inSingletonScope()
        this.#container.bind<IOrderGatewayService>(ORDER_IOC.IOrderGatewayService).to(OrderGateway)
        this.#container.bind<IOrdersMiddlewares>(ORDER_IOC.IOrdersMiddlewares).to(OrdersMiddlewares)
        this.#container.bind<IOrdersHelpers>(ORDER_IOC.IOrdersHelpers).to(OrdersHelpers)
    }
}



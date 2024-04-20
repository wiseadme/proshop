import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { CartController } from '@modules/cart/controller/cart.controller'
import { ICartService } from '@modules/cart/types/service'
import { CartService } from '@modules/cart/service/cart.service'
import { CART_IOC } from '@modules/cart/di/di.types'
import { ICartRepository } from '@modules/cart/types/repository'
import { CartRepository } from '@modules/cart/repository/cart.repository'
import { GatewayService as CartGateway, ICartGatewayService } from '@modules/cart/gateway/gateway.service'

export class CartDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(CartController)
        this.#container.bind<ICartService>(CART_IOC.ICartService).to(CartService)
        this.#container.bind<ICartRepository>(CART_IOC.ICartRepository).to(CartRepository)
        this.#container.bind<ICartGatewayService>(CART_IOC.ICartGatewayService).to(CartGateway)
    }
}



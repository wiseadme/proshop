import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'
import { ProductsController } from '@modules/products/controller/products.controller'
import { ProductsService } from '@modules/products/service/products.service'
import { IProductsService } from '@modules/products/types/service'
import { IProductsRepository } from '@modules/products/types/repository'
import { ProductsRepository } from '@modules/products/repository/products.repository'
import { IProductsGatewayService } from '@modules/products/gateway/gateway.service'
import { GatewayService as ProductsGatewayService } from '@modules/products/gateway/gateway.service'

export class ProductDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductsController)
        this.#container.bind<IProductsService>(PRODUCTS_IOC.IProductsService).to(ProductsService)
        this.#container.bind<IProductsRepository>(PRODUCTS_IOC.IProductsRepository).to(ProductsRepository)
        this.#container.bind<IProductsGatewayService>(PRODUCTS_IOC.IProductsGatewayService).to(ProductsGatewayService)
    }
}



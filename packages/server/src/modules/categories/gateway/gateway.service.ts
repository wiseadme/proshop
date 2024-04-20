import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IProductsService } from '@modules/products/types/service'
import { IOrdersService } from '@modules/orders/types/service'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'

export interface IGatewayService {
    product: IProductsService
    order: IOrdersService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(PRODUCTS_IOC.IProductsService) public product: IProductsService,
        @inject(ORDER_IOC.IOrdersService) private order: IOrdersService
    ) {}
}

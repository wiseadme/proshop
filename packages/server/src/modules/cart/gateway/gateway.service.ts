import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IOrdersService } from '@modules/orders/types/service'
import { IProductsService } from '@modules/products/types/service'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'

export interface ICartGatewayService {
    order: IOrdersService
    product: IProductsService
}

@injectable()
export class GatewayService {
    constructor(
      @inject(ORDER_IOC.IOrdersService) public order: IOrdersService,
      @inject(PRODUCTS_IOC.IProductsService) public product: IProductsService,
    ) {}
}

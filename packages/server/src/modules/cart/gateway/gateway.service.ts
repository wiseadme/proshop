import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IOrdersService } from '@modules/orders/types/service'
import { IProductsService } from '@modules/products/types/service'

export interface ICartGatewayService {
    order: IOrdersService
    product: IProductsService
}

@injectable()
export class GatewayService {
    constructor(
      @inject(TYPES.SERVICES.IOrdersService) public order: IOrdersService,
      @inject(TYPES.SERVICES.IProductsService) public product: IProductsService,
    ) {}
}

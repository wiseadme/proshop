import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IProductsService } from '@modules/products/types/service'
import { IOrdersService } from '@modules/orders/types/service'

export interface IGatewayService {
    product: IProductsService
    order: IOrdersService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.IProductsService) public product: IProductsService,
        @inject(TYPES.SERVICES.IOrdersService) private order: IOrdersService
    ) {}
}

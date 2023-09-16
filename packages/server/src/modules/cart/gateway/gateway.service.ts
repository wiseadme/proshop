import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IOrderService } from '@modules/order/types/service'
import { IProductService } from '@modules/product/types/service'

export interface ICartGatewayService {
    order: IOrderService
    product: IProductService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.IOrderService) public order: IOrderService,
        @inject(TYPES.SERVICES.IProductService) public product: IProductService
    ) {}
}

import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/category/types/service'
import { IProductService } from '@modules/product/types/service'
import { IOrderService } from '@modules/order/types/service'

export interface IGatewayService {
    product: IProductService
    order: IOrderService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.IProductService) public product: IProductService,
        @inject(TYPES.SERVICES.IOrderService) private order: IOrderService
    ) {}
}

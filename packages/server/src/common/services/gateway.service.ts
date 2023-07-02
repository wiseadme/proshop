import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/category/types/service'
import { IProductService } from '@modules/product/types/service'
import { IOrderService } from '@modules/order/types/service'

export interface IGatewayService {
    category(): ICategoryService
    product(): IProductService
    order(): IOrderService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.ICategoryService) private _category: ICategoryService,
        @inject(TYPES.SERVICES.IProductService) private _product: IProductService,
        @inject(TYPES.SERVICES.IOrderService) private _order: IOrderService
    ) {}

    category() {
        return
    }
}

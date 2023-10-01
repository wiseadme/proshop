import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/categories/types/service'
import { IProductsService } from '@modules/products/types/service'
import { IOrdersService } from '@modules/orders/types/service'

export interface IGatewayService {
    category(): ICategoryService
    product(): IProductsService
    order(): IOrdersService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.ICategoryService) private _category: ICategoryService,
        @inject(TYPES.SERVICES.IProductsService) private _product: IProductsService,
        @inject(TYPES.SERVICES.IOrdersService) private _order: IOrdersService
    ) {}

    category() {
        return
    }
}

import { inject, injectable } from 'inversify'
import { ICategoryService } from '@modules/categories/types/service'
import { IProductsService } from '@modules/products/types/service'
import { IOrdersService } from '@modules/orders/types/service'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'

export interface IGatewayService {
    category(): ICategoryService
    product(): IProductsService
    order(): IOrdersService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(CATEGORY_IOC.ICategoryService) private _category: ICategoryService,
        @inject(PRODUCTS_IOC.IProductsService) private _product: IProductsService,
        @inject(ORDER_IOC.IOrdersService) private _order: IOrdersService
    ) {}

    category() {
        return
    }
}

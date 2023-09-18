import { IProductsService } from '@modules/products/types/service'
import { ICategoryService } from '@modules/category/types/service'
import { IOrdersService } from '@modules/orders/types/service'

export interface IGatewayService {
    product?: IProductsService
    category?: ICategoryService
    order?: IOrdersService
}

import { IProductService } from '@modules/products/types/service'
import { ICategoryService } from '@modules/category/types/service'
import { IOrderService } from '@modules/orders/types/service'

export interface IGatewayService {
    product?: IProductService
    category?: ICategoryService
    order?: IOrderService
}

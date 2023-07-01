import { IProductService } from '@modules/product/types/service'
import { ICategoryService } from '@modules/category/types/service'
import { IOrderService } from '@modules/order/types/service'

export interface IGatewayService {
    product?: IProductService
    category?: ICategoryService
    order?: IOrderService
}

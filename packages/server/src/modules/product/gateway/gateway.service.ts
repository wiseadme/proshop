import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/category/types/service'
import { IOrderService } from '@modules/order/types/service'
import { IAssetsService } from '@modules/asset/types/service'

export interface IProductGatewayService {
    category: ICategoryService
    order: IOrderService
    asset: IAssetsService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.ICategoryService) public category: ICategoryService,
        @inject(TYPES.SERVICES.IOrderService) public order: IOrderService,
        @inject(TYPES.SERVICES.IAssetsService) public asset: IAssetsService
    ) {}
}

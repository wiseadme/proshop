import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/category/types/service'
import { IOrdersService } from '@modules/orders/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IOptionService } from '@modules/options/types/service'

export interface IProductGatewayService {
    category: ICategoryService
    order: IOrdersService
    asset: IAssetsService
    option: IOptionService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.ICategoryService) public category: ICategoryService,
        @inject(TYPES.SERVICES.IOrdersService) public order: IOrdersService,
        @inject(TYPES.SERVICES.IAssetsService) public asset: IAssetsService,
        @inject(TYPES.SERVICES.IOptionService) public option: IOptionService
    ) {}
}

import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICategoryService } from '@modules/categories/types/service'
import { IOrdersService } from '@modules/orders/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IOptionService } from '@modules/options/types/service'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'
import { ORDER_IOC } from '@modules/orders/di/di.types'
import { ASSET_IOC } from '@modules/asset/di/di.types'
import { OPTION_IOC } from '@modules/options/di/di.types'

export interface IProductsGatewayService {
    category: ICategoryService
    order: IOrdersService
    asset: IAssetsService
    option: IOptionService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(CATEGORY_IOC.ICategoryService) public category: ICategoryService,
        @inject(ORDER_IOC.IOrdersService) public order: IOrdersService,
        @inject(ASSET_IOC.IAssetsService) public asset: IAssetsService,
        @inject(OPTION_IOC.IOptionService) public option: IOptionService
    ) {}
}

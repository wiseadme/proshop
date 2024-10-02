import { inject, injectable } from 'inversify'
import { ICategoryService } from '@modules/categories/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IOptionService } from '@modules/options/types/service'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'
import { ASSET_IOC } from '@modules/asset/di/di.types'
import { OPTION_IOC } from '@modules/options/di/di.types'

export interface IProductsGatewayService {
    category: ICategoryService
    asset: IAssetsService
    option: IOptionService
    // bot: any
}

@injectable()
export class GatewayService {
    constructor(
        @inject(CATEGORY_IOC.ICategoryService) public category: ICategoryService,
        @inject(ASSET_IOC.IAssetsService) public asset: IAssetsService,
        @inject(OPTION_IOC.IOptionService) public option: IOptionService
    ) {}
}

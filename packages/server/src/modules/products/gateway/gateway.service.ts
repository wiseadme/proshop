import { inject, injectable } from 'inversify'
import { ICategoryService } from '@modules/categories/types/service'

export interface ICustomerGatewayService {
    telegram: ICategoryService
}

@injectable()
export class GatewayService {
    constructor(

        // @inject(CATEGORY_IOC.ICategoryService) public category: ICategoryService,
    ) {}
}

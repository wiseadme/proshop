import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICartService } from '@modules/cart/types/service'

export interface IOrderGatewayService {
    cart: ICartService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(TYPES.SERVICES.ICartService) public cart: ICartService,
    ) {}
}

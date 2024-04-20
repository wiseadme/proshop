import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ICartService } from '@modules/cart/types/service'
import { CART_IOC } from '@modules/cart/di/di.types'

export interface IOrderGatewayService {
    cart: ICartService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(CART_IOC.ICartService) public cart: ICartService,
    ) {}
}

import { inject, injectable } from 'inversify'
import { ICartService } from '@modules/cart/types/service'
import { CART_IOC } from '@modules/cart/di/di.types'
import { PRODUCTS_IOC } from '@modules/products/di/di.types'
import { IProductsService } from '@modules/products/types/service'

export interface IOrderGatewayService {
    cart: ICartService
    product: IProductsService
}

@injectable()
export class GatewayService {
    constructor(
        @inject(CART_IOC.ICartService) public cart: ICartService,
        @inject(PRODUCTS_IOC.IProductsService) public product: IProductsService,
    ) {}
}

import { IFavorite, IProduct } from '@proshop-app/types'

export class Favorite implements IFavorite{
    readonly id: string
    readonly sku: string
    readonly userId?: string
    readonly product?: IProduct

    constructor({
        id = '',
        userId,
        sku,
        product = undefined
    }: IFavorite) {
        this.id = id
        this.userId = userId
        this.sku = sku
        this.product = product
    }

    static create(favorite: IFavorite) {
        return new Favorite(favorite)
    }
}

import { IFavorite, IProduct } from '@proshop/types'

export class Favorite implements IFavorite{
    readonly id: string
    readonly userId: string
    readonly sku: string

    constructor({
        id = '',
        userId,
        sku = ''
    }) {
        this.id = id
        this.userId = userId
        this.sku = sku
    }

    static create(favorite: IFavorite): IFavorite {
        return new Favorite(favorite) as IFavorite
    }
}

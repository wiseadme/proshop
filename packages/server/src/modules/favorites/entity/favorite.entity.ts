import { IFavorite, IProduct } from '@proshop/types'

export class Favorite implements IFavorite{
    readonly id: string
    readonly user: string
    readonly sku: string

    constructor({
        id = '',
        user,
        sku = ''
    }) {
        this.id = id
        this.user = user
        this.sku = sku
    }
}

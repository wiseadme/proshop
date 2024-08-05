import { IFavorite } from '@proshop-app/types'

export class Favorite implements IFavorite {
    readonly id: string
    readonly sku: string

    constructor({
        id = '',
        sku,
    }: IFavorite) {
        this.id = id
        this.sku = sku
    }

    static create(favorite: IFavorite) {
        return new Favorite(favorite)
    }
}

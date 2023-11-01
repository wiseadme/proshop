import { IFavorite, IProduct } from '@proshop/types'

export class Favorite implements IFavorite{
    readonly id: string
    readonly userId: string
    readonly items: string[] | IProduct[]

    constructor({
        id = '',
        userId,
        items = []
    }) {
        this.id = id
        this.userId = userId
        this.items = items
    }
}

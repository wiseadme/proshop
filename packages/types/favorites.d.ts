import { IProduct } from './product'

export interface IFavorite {
    id: string
    userId: string
    items: string[] | IProduct[]
}

export interface IFavoriteMongoModel extends Omit<IFavorite, 'id'> {
    _id: string
}

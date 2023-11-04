import { IProduct } from './product'

export interface IFavorite {
    id: string
    product?: IProduct
    userId?: string
    sku: string
}

export interface IFavoriteMongoModel extends Omit<IFavorite, 'id'> {
    _id: string
}

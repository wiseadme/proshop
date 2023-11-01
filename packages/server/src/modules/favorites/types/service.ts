import { IFavorite } from '@proshop/types'

export interface IFavoriteService {
    addToFavorites(productId): Promise<IFavorite>
}

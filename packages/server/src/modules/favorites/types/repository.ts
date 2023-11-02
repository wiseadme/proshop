import { IFavorite } from '@proshop/types'

export interface IFavoriteRepository {
    saveFavorite(favorite: IFavorite): Promise<IFavorite>
}

import { IFavorite } from '@proshop/types'

export interface IFavoritesRepository {
    create(favorite: Partial<IFavorite>): Promise<IFavorite>

    read(userId: string): Promise<IFavorite[]>

    delete(params: { sku: string, userId: string }): Promise<boolean>
}

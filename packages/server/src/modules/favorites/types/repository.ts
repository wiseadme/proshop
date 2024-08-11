import { IFavorite } from '@proshop-app/types'

export interface IFavoritesRepository {
    create(favorite: IFavorite & { userId: string }): Promise<IFavorite>

    read(userId: string): Promise<IFavorite[]>

    delete(params: { sku: string, userId: string }): Promise<boolean>
}

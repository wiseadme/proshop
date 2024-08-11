import { IFavorite } from '@proshop-app/types'

export interface IFavoritesService {
    addToFavorites(productId): Promise<IFavorite>

    getFavorites(cookies: Record<string, any>): Promise<IFavorite[]>

    deleteFavorite(params: { sku: string, cookies: Record<string, any> }): Promise<boolean>
}

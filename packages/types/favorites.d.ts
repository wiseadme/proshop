export interface IFavorite {
    id: string
    userId: string
    map: Record<string, boolean>
}

export interface IFavoriteMongoModel extends Omit<IFavorite, 'id'> {
    _id: string
}

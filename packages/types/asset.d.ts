export interface IAsset {
    id: string
    url: string
    type: string,
    fileName: string,
    ownerId: string,
    main: boolean
}

export interface IAssetMongoModel extends Omit<IAsset, 'id'>{
    _id: string
}

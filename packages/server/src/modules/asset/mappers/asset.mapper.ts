import { IAsset, IAssetMongoModel } from '@proshop/types'

export class AssetMapper {
    static toDomain(entity: IAssetMongoModel): IAsset {
        const { _id } = entity
        const map: Partial<IAssetMongoModel> = entity

        delete map._id

        return {
            id: _id,
            ...map,
        } as IAsset

    }

    static toMongoModelData(domainModel: IAsset): IAssetMongoModel {
        const { id } = domainModel
        const map: Partial<IAsset> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IAssetMongoModel
    }
}

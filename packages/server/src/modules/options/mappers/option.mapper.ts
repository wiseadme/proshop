import { IOption, IOptionMongoModel } from '@proshop/types'

export class OptionMapper {
    static toDomain(entity: IOptionMongoModel): IOption {
        const { _id } = entity
        const map: Partial<IOptionMongoModel> = { ...entity }

        const product = { ...(map.product as any || {}) }
        const { _id: prodId } = product

        product.id = prodId

        delete map._id
        delete product._id

        return {
            id: _id,
            ...map,
            product,
        } as IOption
    }

    static toMongoModelData(domainModel: IOption): IOptionMongoModel {
        const { id } = domainModel
        const map: Partial<IOption> = domainModel

        delete map.id

        return {
            _id: id,
            ...map,
        } as IOptionMongoModel
    }
}

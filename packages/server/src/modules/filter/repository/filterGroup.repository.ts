import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterGroupModel } from '@modules/filter/model/filterGroup.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IFilterGroup } from '@proshop/types'
import { IFilterGroupRepository } from '../types/repository'

@injectable()
export class FilterGroupRepository implements IFilterGroupRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(filterGroup: IFilterGroup): Promise<Document & IFilterGroup> {
        return (await new FilterGroupModel({
            _id: new mongoose.Types.ObjectId(),
            name: filterGroup.name,
            attributeName: filterGroup.attributeName,
            associate: filterGroup.associate
        })
            .save() as any)
    }

    async read(id?: string): Promise<Array<Document & IFilterGroup>> {
        id && validateId(id)

        const filters = await FilterGroupModel.find(id ? { _id: id } : {})

        return filters as Array<Document & IFilterGroup>
    }

    async update(updates: Partial<IFilterGroup>): Promise<{ updated: Document & IFilterGroup }> {
        validateId(updates._id)

        const option = await FilterGroupModel.findByIdAndUpdate(
            { _id: updates._id },
            { $set: updates },
            { new: true },
        ).populate('assets') as Document & IFilterGroup

        return { updated: option }
    }

    async delete(id) {
        validateId(id)

        return !!await FilterGroupModel.findByIdAndDelete(id)
    }
}

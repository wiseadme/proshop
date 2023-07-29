import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { FilterItemModel } from '@modules/filter/model/filterItem.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IFilterItem } from '@proshop/types'
import { IFilterItemRepository } from '../types/repository'

@injectable()
export class FilterItemRepository implements IFilterItemRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(filterItem: IFilterItem): Promise<Document & IFilterItem> {
        return (await new FilterItemModel({
            _id: new mongoose.Types.ObjectId(),
            value: filterItem.value,
            groupId: filterItem.groupId,
        }).save() as any)
    }

    async read(id?: string): Promise<Array<Document & IFilterItem>> {
        id && validateId(id)

        const filters = await FilterItemModel.find(id ? { _id: id } : {})

        return filters as Array<Document & IFilterItem>
    }

    async update(updates: Partial<IFilterItem>): Promise<{ updated: Document & IFilterItem }> {
        validateId(updates.id)

        const option = await FilterItemModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        ).populate('assets') as Document & IFilterItem

        return { updated: option }
    }

    async delete(id) {
        validateId(id)

        return !!await FilterItemModel.findByIdAndDelete(id)
    }
}

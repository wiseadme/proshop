import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { UnitModel } from '@modules/unit/model/unit.model'
import { UnitsMapper } from '@modules/unit/mappers/units.mapper'

// Types
import { ILogger } from '@/types/utils'
import { IUnit, IUnitMongoModel } from '@proshop-app/types'
import { IUnitRepository } from '@modules/unit/types/repository'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class UnitRepository implements IUnitRepository {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    ) {
    }

    async create(unit: IUnit) {
        const unitData = await new UnitModel({
            ...UnitsMapper.toMongoModelData(unit),
            _id: new mongoose.Types.ObjectId(),
        }).save()

        return UnitsMapper.toDomain(unitData.toObject())
    }

    async read(params) {
        const units = await UnitModel
            .find(params)
            .lean() as IUnitMongoModel[]

        return units.map(unit => UnitsMapper.toDomain(unit))
    }

    async update(updates: Partial<IUnit>) {
        validateId(updates.id)

        const updated = await UnitModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        ).lean() as IUnitMongoModel

        return UnitsMapper.toDomain(updated)
    }

    async delete(id): Promise<boolean> {
        return !!await UnitModel.findByIdAndDelete(id)
    }
}

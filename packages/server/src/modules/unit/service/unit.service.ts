import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IUnitService } from '@modules/unit/types/service'
import { IUnitRepository } from '@modules/unit/types/repository'
import { IUnit } from '@proshop-app/types'

@injectable()
export class UnitService implements IUnitService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IUnitRepository) private repository: IUnitRepository,
    ) {
    }

    create(unit: IUnit) {
        return this.repository.create(unit)
    }

    read(params: Partial<IUnit>) {
        return this.repository.read(params)
    }

    update(updates: Partial<IUnit>) {
        return this.repository.update(updates)
    }

    delete(id: string) {
        return this.repository.delete(id)
    }
}

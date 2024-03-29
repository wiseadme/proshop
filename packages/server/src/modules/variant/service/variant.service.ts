import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { Document } from 'mongoose'
import { IVariant } from '@proshop/types'
import { IVariantService } from '../types/service'
import { IVariantRepository } from '../types/repository'
import { Variant } from '@modules/variant/entity/variant.entity'

@injectable()
export class VariantService implements IVariantService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(TYPES.REPOSITORIES.IVariantRepository) private repository: IVariantRepository,
    ) {
    }

    async create(variant: IVariant) {
        return await this.repository.create(Variant.create(variant))
    }

    async read() {
        return await this.repository.read()
    }

    async update(updates: Partial<IVariant>) {
        return this.repository.update(updates)
    }

    async delete(id: string) {
        return await this.repository.delete(id)
    }
}

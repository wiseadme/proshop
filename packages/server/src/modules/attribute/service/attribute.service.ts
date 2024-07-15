import { Document } from 'mongoose'
import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IAttributeService } from '@modules/attribute/types/service'
import { IAttributeRepository } from '@modules/attribute/types/repository'
import type { IAttribute } from '@proshop-app/types'
import { ATTRIBUTE_IOC } from '@modules/attribute/di/di.types'

@injectable()
export class AttributeService implements IAttributeService {
    constructor(
        @inject(TYPES.UTILS.ILogger) private logger: ILogger,
        @inject(ATTRIBUTE_IOC.IAttributeRepository) private repository: IAttributeRepository,
    ) {
    }

    create(attribute) {
        return this.repository.create(attribute)
    }

    read(id?: string): Promise<IAttribute[]> {
        return this.repository.read(id)
    }

    async update(updates: Partial<IAttribute>): Promise<IAttribute | IAttribute[]> {
        let data: any

        if (Array.isArray(updates)) {
            data = []

            for await (const atr of updates) {
                const attr = await this.repository.update(atr)
                data.push(attr)
            }

            return data
        }

        return await this.repository.update(updates)
    }

    delete(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }
}

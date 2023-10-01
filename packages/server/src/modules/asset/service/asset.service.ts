import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { IAssetsService } from '../types/service'
import { IAssetsRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'
// Constants
import {
    DELETE_CATEGORY_EVENT,
    DELETE_OPTION_EVENT,
    UPDATE_ASSETS_EVENT,
} from '@common/constants/events'
import { IAsset } from '@proshop/types'

@injectable()
export class AssetService implements IAssetsService {
    constructor(
        @inject(TYPES.REPOSITORIES.IAssetsRepository) private repository: IAssetsRepository,
        @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService,
    ) {
        this.addEventListeners()
    }

    async saveFile(req: Request, res: Response) {
        return await this.repository.save(req, res)
    }

    async updateFile(updates: Partial<IAsset>) {
        return await this.repository.update(updates)
    }

    async updateMany(updates: Partial<IAsset>[]) {
        return await this.repository.updateMany(updates)
    }

    async deleteFile(asset: IAsset) {
        return await this.repository.deleteOne(asset)
    }

    async deleteFiles(id: string) {
        return await this.repository.deleteAll(id)
    }

    addEventListeners() {
        this.events.on(UPDATE_ASSETS_EVENT, this.updateFile.bind(this))
        this.events.on(DELETE_OPTION_EVENT, this.deleteFiles.bind(this))
        this.events.on(DELETE_CATEGORY_EVENT, this.deleteFiles.bind(this))
    }
}

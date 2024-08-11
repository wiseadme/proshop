import { Container } from 'inversify'
import { IController } from '@/types'
import { ASSET_IOC } from '@modules/asset/di/di.types'
import { TYPES } from '@common/schemes/di-types'
import { AssetController } from '@modules/asset/controller/asset.controller'
import { IAssetsService } from '@modules/asset/types/service'
import { AssetService } from '@modules/asset/service/asset.service'
import { IAssetsRepository } from '@modules/asset/types/repository'
import { AssetRepository } from '@modules/asset/repository/asset.repository'

export class AssetDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(AssetController)
        this.#container.bind<IAssetsService>(ASSET_IOC.IAssetsService).to(AssetService)
        this.#container.bind<IAssetsRepository>(ASSET_IOC.IAssetsRepository).to(AssetRepository)
    }
}



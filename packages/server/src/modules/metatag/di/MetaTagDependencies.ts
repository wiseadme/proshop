import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { MetaTagController } from '@modules/metatag/controller/metatag.controller'
import { IMetaTagService } from '@modules/metatag/types/service'
import { MetaTagService } from '@modules/metatag/service/metatag.service'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { MetaTagRepository } from '@modules/metatag/repository/metatag.repository'
import { META_TAG_IOC } from '@modules/metatag/di/di.types'

export class MetaTagDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(MetaTagController)
        this.#container.bind<IMetaTagService>(META_TAG_IOC.IMetaTagService).to(MetaTagService)
        this.#container.bind<IMetaTagRepository>(META_TAG_IOC.IMetaTagRepository).to(MetaTagRepository)
    }
}



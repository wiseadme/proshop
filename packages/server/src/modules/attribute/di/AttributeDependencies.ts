import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { AttributeController } from '@modules/attribute/controller/attribute.controller'
import { IAttributeService } from '@modules/attribute/types/service'
import { AttributeService } from '@modules/attribute/service/attribute.service'
import { container } from '@common/dependencies'
import { ATTRIBUTE_IOC } from '@modules/attribute/di/di.types'
import { IAttributeRepository } from '@modules/attribute/types/repository'
import { AttributeRepository } from '@modules/attribute/repository/attribute.repository'

export class AttributeDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(AttributeController)
        this.#container.bind<IAttributeService>(ATTRIBUTE_IOC.IAttributeService).to(AttributeService)
        this.#container.bind<IAttributeRepository>(ATTRIBUTE_IOC.IAttributeRepository).to(AttributeRepository)
    }
}



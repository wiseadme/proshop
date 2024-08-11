import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { OptionsController } from '@modules/options/controller/options.controller'
import { IOptionService } from '@modules/options/types/service'
import { OptionService } from '@modules/options/service/option.service'
import { IOptionRepository } from '@modules/options/types/repository'
import { OptionRepository } from '@modules/options/repository/option.repository'
import { OPTION_IOC } from '@modules/options/di/di.types'

export class OptionDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(OptionsController)
        this.#container.bind<IOptionService>(OPTION_IOC.IOptionService).to(OptionService)
        this.#container.bind<IOptionRepository>(OPTION_IOC.IOptionRepository).to(OptionRepository)
    }
}



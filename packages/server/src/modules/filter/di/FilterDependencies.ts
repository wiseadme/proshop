import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { FilterController } from '@modules/filter/controller/filter.controller'
import { IFilterGroupService, IFilterItemService } from '@modules/filter/types/service'
import { FilterGroupService } from '@modules/filter/service/filterGroup.service'
import { FilterItemService } from '@modules/filter/service/filterItem.service'
import { IFilterGroupRepository, IFilterItemRepository } from '@modules/filter/types/repository'
import { FilterGroupRepository } from '@modules/filter/repository/filterGroup.repository'
import { FilterItemRepository } from '@modules/filter/repository/filterItem.repository'
import { FILTER_IOC } from '@modules/filter/di/di.types'

export class FilterDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(FilterController)
        this.#container.bind<IFilterGroupService>(FILTER_IOC.IFilterGroupService).to(FilterGroupService)
        this.#container.bind<IFilterItemService>(FILTER_IOC.IFilterItemService).to(FilterItemService)
        this.#container.bind<IFilterGroupRepository>(FILTER_IOC.IFilterGroupRepository).to(FilterGroupRepository)
        this.#container.bind<IFilterItemRepository>(FILTER_IOC.IFilterItemRepository).to(FilterItemRepository)
    }
}



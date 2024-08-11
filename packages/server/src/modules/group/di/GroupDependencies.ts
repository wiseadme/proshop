import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { GroupController } from '@modules/group/controller/group.controller'
import { IGroupService } from '@modules/group/types/service'
import { GROUP_IOC } from '@modules/group/di/di.types'
import { GroupService } from '@modules/group/service/group.service'
import { IGroupRepository } from '../types/repository'
import { GroupRepository } from '@modules/group/repository/group.repository'

export class GroupDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(GroupController)
        this.#container.bind<IGroupService>(GROUP_IOC.IGroupService).to(GroupService)
        this.#container.bind<IGroupRepository>(GROUP_IOC.IGroupRepository).to(GroupRepository)
    }
}



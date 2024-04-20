import { Container } from 'inversify'
import { IController } from '@/types'
import { ICategoryService } from '@modules/categories/types/service'
import { CategoryService } from '@modules/categories/service/category.service'
import { CATEGORY_IOC } from '@modules/categories/di/di.types'
import { TYPES } from '@common/schemes/di-types'
import { CategoryController } from '@modules/categories/controller/category.controller'
import { ICategoryRepository } from '@modules/categories/types/repository'
import { CategoryRepository } from '@modules/categories/repository/category.repository'

export class CategoryDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)
        this.#container.bind<ICategoryService>(CATEGORY_IOC.ICategoryService).to(CategoryService)
        this.#container.bind<ICategoryRepository>(CATEGORY_IOC.ICategoryRepository).to(CategoryRepository)
    }
}



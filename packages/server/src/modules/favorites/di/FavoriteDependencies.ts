import { Container } from 'inversify'
import { IController } from '@/types'
import { TYPES } from '@common/schemes/di-types'
import { FavoritesController } from '@modules/favorites/controller/favorites.controller'
import { IFavoritesService } from '@modules/favorites/types/service'
import { FavoritesService } from '@modules/favorites/service/favorites.service'
import { IFavoritesRepository } from '@modules/favorites/types/repository'
import { FavoritesRepository } from '@modules/favorites/repository/favorites.repository'
import { FAVORITES_IOC } from '@modules/favorites/di/di.types'

export class FavoriteDependencies {
    #container: Container

    constructor(container: Container) {
        this.#container = container
        this.init()
    }

    init() {
        this.#container.bind<IController>(TYPES.CONTROLLERS.IController).to(FavoritesController)
        this.#container.bind<IFavoritesService>(FAVORITES_IOC.IFavoritesService).to(FavoritesService)
        this.#container.bind<IFavoritesRepository>(FAVORITES_IOC.IFavoritesRepository).to(FavoritesRepository)
    }
}



import 'reflect-metadata'
import App from '@app/app'
import { DB } from '@app/db'
// import { RedisDb } from '@app/redis'
import { Config } from '@app/config'
import { TYPES } from '@common/schemes/di-types'
import { Container } from 'inversify'

// Controllers
import { SwaggerController } from '@swagger/controller/swagger.controller'
import { VariantController } from '@modules/variant/controller/variant.controller'
import { UnitController } from '@modules/unit/controller/unit.controller'
import { UserController } from '@modules/user/controller/user.controller'
import { SettingsController } from '@modules/settings/controller/settings.controller'

// Services
import { LoggerService } from '../services/logger.service'
import { VariantService } from '@modules/variant/service/variant.service'
import { UnitService } from '@modules/unit/service/unit.service'
import { EventBusService } from '@common/services/event-bus.service'
import { UserService } from '@modules/user/service/user.service'
import { MerchantService } from '@modules/settings/services/merchant.service'
import { SettingsService } from '@modules/settings/services/settings.service'
import { SiteService } from '@modules/settings/services/site.service'

// Repositories
import { VariantRepository } from '@modules/variant/repository/variant.repository'
import { UnitRepository } from '@modules/unit/repository/unit.repository'
import { UserRepository } from '@modules/user/repository/user.repository'
import { MerchantRepository } from '@modules/settings/repositories/merchant.repository'
import { SiteRepository } from '@modules/settings/repositories/site.repository'
import { SettingsRepository } from '@modules/settings/repositories/settings.repository'

// Middlewares
import { JsonMiddleware } from '@common/middlewares/json.middleware'
import { UrlEncodedMiddleware } from '@common/middlewares/urlencoded.middleware'
import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { ErrorRouteMiddleware } from '../middlewares/error.route.middleware'
import { FileLoaderMiddleware } from '@common/middlewares/fileloader.middleware'
// import { SessionMiddleware } from '@common/middlewares/session.middleware'
import { CookieMiddleware } from '@common/middlewares/cookie.middleware'
// import { CorsMiddleware } from '@common/middlewares/cors.middleware'

// Types
import { IVariantService } from '@modules/variant/types/service'
import { IUnitService } from '@modules/unit/types/service'
import { IUserService } from '@modules/user/types/service'
import { IEventBusService } from '@/types/services'
import { IMerchantService, ISettingsService, ISiteService } from '@modules/settings/types/service'

import { IVariantRepository } from '@modules/variant/types/repository'
import { IUnitRepository } from '@modules/unit/types/repository'
import { IUserRepository } from '@modules/user/types/repository'
import { IMerchantRepository, ISettingsRepository, ISiteRepository } from '@modules/settings/types/repository'

// Utils Types
import { ILogger } from '@/types/utils'
import { IConfig, IController, IDb } from '@/types'
import { IErrorRouteMiddleware, IExpressMiddleware, IFileLoaderMiddleware, IMiddleware } from '@/types/middlewares'
import { AuthMiddleware } from '@common/middlewares/auth.middleware'

// IOC Deps
import { OrderDependencies } from '@modules/orders/di/OrderDependencies'
import { CategoryDependencies } from '@modules/categories/di/CategoryDependencies'
import { AssetDependencies } from '@modules/asset/di/AssetDependencies'
import { AttributeDependencies } from '@modules/attribute/di/AttributeDependencies'
import { CartDependencies } from '@modules/cart/di/CartDependencies'
import { CustomerDependencies } from '@modules/customer/di/CustomerDependencies'
import { FavoriteDependencies } from '@modules/favorites/di/FavoriteDependencies'
import { FilterDependencies } from '@modules/filter/di/FilterDependencies'
import { MetaTagDependencies } from '@modules/metatag/di/MetaTagDependencies'
import { OptionDependencies } from '@modules/options/di/OptionDependencies'
import { ProductDependencies } from '@modules/products/di/ProductDependencies'
import { GroupDependencies } from '@modules/group/di/GroupDependencies'

export const container = new Container({ skipBaseClassChecks: true })

new OrderDependencies(container)
new CategoryDependencies(container)
new AssetDependencies(container)
new AttributeDependencies(container)
new CartDependencies(container)
new CustomerDependencies(container)
new FavoriteDependencies(container)
new FilterDependencies(container)
new MetaTagDependencies(container)
new OptionDependencies(container)
new ProductDependencies(container)
new GroupDependencies(container)

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
// container.bind<IRedis>(TYPES.REDIS).to(RedisDb)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<IVariantService>(TYPES.SERVICES.IVariantService).to(VariantService)
container.bind<IEventBusService>(TYPES.SERVICES.IEventBusService).to(EventBusService)
container.bind<IUnitService>(TYPES.SERVICES.IUnitService).to(UnitService)
container.bind<IUserService>(TYPES.SERVICES.IUserService).to(UserService)
container.bind<IMerchantService>(TYPES.SERVICES.IMerchantService).to(MerchantService)
container.bind<ISettingsService>(TYPES.SERVICES.ISettingsService).to(SettingsService)
container.bind<ISiteService>(TYPES.SERVICES.ISiteService).to(SiteService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SwaggerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(VariantController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UnitController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UserController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SettingsController)

// Middlewares
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(JsonMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(CookieMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(UrlEncodedMiddleware)
// container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(CorsMiddleware)
// @ts-ignore
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(AuthMiddleware)
container.bind<IErrorRouteMiddleware>(TYPES.MIDDLEWARES.IErrorRouteMiddleware).to(ErrorRouteMiddleware)
container.bind<IFileLoaderMiddleware>(TYPES.MIDDLEWARES.IFileLoaderMiddleware).to(FileLoaderMiddleware)

// Repositories
container.bind<IVariantRepository>(TYPES.REPOSITORIES.IVariantRepository).to(VariantRepository)
container.bind<IUnitRepository>(TYPES.REPOSITORIES.IUnitRepository).to(UnitRepository)
container.bind<IUserRepository>(TYPES.REPOSITORIES.IUserRepository).to(UserRepository)
container.bind<IMerchantRepository>(TYPES.REPOSITORIES.IMerchantRepository).to(MerchantRepository)
container.bind<ISettingsRepository>(TYPES.REPOSITORIES.ISettingsRepository).to(SettingsRepository)
container.bind<ISiteRepository>(TYPES.REPOSITORIES.ISiteRepository).to(SiteRepository)



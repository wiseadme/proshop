import 'reflect-metadata'
import App from '@app/app'
import { DB } from '@app/db'
import { RedisDb } from '@app/redis'
import { Config } from '@app/config'
import { TYPES } from '../schemes/di-types'
import { Container } from 'inversify'

// Controllers
import { CategoryController } from '@modules/categories/controller/category.controller'
import { ProductsController } from '@modules/products/controller/products.controller'
import { AssetController } from '@modules/asset/controller/asset.controller'
import { AttributeController } from '@modules/attribute/controller/attribute.controller'
import { SwaggerController } from '@swagger/controller/swagger.controller'
import { VariantController } from '@modules/variant/controller/variant.controller'
import { UnitController } from '@modules/unit/controller/unit.controller'
import { CartController } from '@modules/cart/controller/cart.controller'
import { OrdersController } from '@modules/orders/controller/orders.controller'
import { OptionsController } from '@modules/options/controller/options.controller'
import { UserController } from '@modules/user/controller/user.controller'
import { CustomerController } from '@modules/customer/controller/customer.controller'
import { MetaTagController } from '@modules/metatag/controller/metatag.controller'
import { SettingsController } from '@modules/settings/controller/settings.controller'
import { FavoritesController } from '@modules/favorites/controller/favorites.controller'

// Services
import { LoggerService } from '../services/logger.service'
import { CategoryService } from '@modules/categories/service/category.service'
import { ProductsService } from '@modules/products/service/products.service'
import { VariantService } from '@modules/variant/service/variant.service'
import { AssetService } from '@modules/asset/service/asset.service'
import { AttributeService } from '@modules/attribute/service/attribute.service'
import { UnitService } from '@modules/unit/service/unit.service'
import { CartService } from '@modules/cart/service/cart.service'
import { OrdersService } from '@modules/orders/service/orders.service'
import { OptionService } from '@modules/options/service/option.service'
import { EventBusService } from '@common/services/event-bus.service'
import { UserService } from '@modules/user/service/user.service'
import { CustomerService } from '@modules/customer/service/customer.service'
import { MetaTagService } from '@modules/metatag/service/metatag.service'
import { MerchantService } from '@modules/settings/services/merchant.service'
import { SettingsService } from '@modules/settings/services/settings.service'
import { SiteService } from '@modules/settings/services/site.service'
import { FilterGroupService } from '@modules/filter/service/filterGroup.service'
import { FilterItemService } from '@modules/filter/service/filterItem.service'
import { FavoritesService } from '@modules/favorites/service/favorites.service'

import { GatewayService as ProductGateway, IProductGatewayService } from '@modules/products/gateway/gateway.service'
import { GatewayService as CartGateway, ICartGatewayService } from '@modules/cart/gateway/gateway.service'
import { GatewayService as OrderGateway, IOrderGatewayService } from '@modules/orders/gateway/gateway.service'

// Repositories
import { CategoryRepository } from '@modules/categories/repository/category.repository'
import { ProductsRepository } from '@modules/products/repository/products.repository'
import { VariantRepository } from '@modules/variant/repository/variant.repository'
import { AssetRepository } from '@modules/asset/repository/asset.repository'
import { AttributeRepository } from '@modules/attribute/repository/attribute.repository'
import { UnitRepository } from '@modules/unit/repository/unit.repository'
import { CartRepository } from '@modules/cart/repository/cart.repository'
import { OrdersRepository } from '@modules/orders/repository/orders.repository'
import { OptionRepository } from '@modules/options/repository/option.repository'
import { UserRepository } from '@modules/user/repository/user.repository'
import { CustomerRepository } from '@modules/customer/repository/customer.repository'
import { MetaTagRepository } from '@modules/metatag/repository/metatag.repository'
import { MerchantRepository } from '@modules/settings/repositories/merchant.repository'
import { SiteRepository } from '@modules/settings/repositories/site.repository'
import { SettingsRepository } from '@modules/settings/repositories/settings.repository'
import { FilterGroupRepository } from '@modules/filter/repository/filterGroup.repository'
import { FilterItemRepository } from '@modules/filter/repository/filterItem.repository'
import { FavoritesRepository } from '@modules/favorites/repository/favorites.repository'
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
import { ICategoryService } from '@modules/categories/types/service'
import { IProductsService } from '@modules/products/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IVariantService } from '@modules/variant/types/service'
import { IAttributeService } from '@modules/attribute/types/service'
import { IUnitService } from '@modules/unit/types/service'
import { ICartService } from '@modules/cart/types/service'
import { IOrdersService } from '@modules/orders/types/service'
import { IOptionService } from '@modules/options/types/service'
import { IUserService } from '@modules/user/types/service'
import { ICustomerService } from '@modules/customer/types/service'
import { IEventBusService } from '@/types/services'
import { IMerchantService, ISettingsService, ISiteService } from '@modules/settings/types/service'
import { IMetaTagService } from '@modules/metatag/types/service'
import { IFilterGroupService } from '@modules/filter/types/service'
import { IFilterItemService } from '@modules/filter/types/service'
import { IFavoritesService } from '@modules/favorites/types/service'

import { ICategoryRepository } from '@modules/categories/types/repository'
import { IAssetsRepository } from '@modules/asset/types/repository'
import { IProductsRepository } from '@modules/products/types/repository'
import { IVariantRepository } from '@modules/variant/types/repository'
import { IAttributeRepository } from '@modules/attribute/types/repository'
import { IUnitRepository } from '@modules/unit/types/repository'
import { IUserRepository } from '@modules/user/types/repository'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICartRepository } from '@modules/cart/types/repository'
import { IOrdersRepository } from '@modules/orders/types/repository'
import { IOptionRepository } from '@modules/options/types/repository'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { IMerchantRepository, ISettingsRepository, ISiteRepository } from '@modules/settings/types/repository'
import { IFilterGroupRepository } from '@modules/filter/types/repository'
import { IFilterItemRepository } from '@modules/filter/types/repository'
import { IFavoritesRepository } from '@modules/favorites/types/repository'
// Utils Types
import { ILogger } from '@/types/utils'
import { IConfig, IController, IDb, IRedis } from '@/types'
import { IErrorRouteMiddleware, IExpressMiddleware, IFileLoaderMiddleware, IMiddleware } from '@/types/middlewares'
import { AuthMiddleware } from '@common/middlewares/auth.middleware'
import { FilterController } from '@modules/filter/controller/filter.controller'
import { IOrdersQueue, OrdersQueue } from '@modules/orders/queue/queue'
import { OrderTypes } from '@modules/orders/di/di.types'

export const container = new Container({ skipBaseClassChecks: true })

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
container.bind<IRedis>(TYPES.REDIS).to(RedisDb)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)
container.bind<IOrdersQueue>(OrderTypes.ORDERS_QUEUE).to(OrdersQueue).inSingletonScope()

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)
container.bind<IProductsService>(TYPES.SERVICES.IProductsService).to(ProductsService)
container.bind<IAssetsService>(TYPES.SERVICES.IAssetsService).to(AssetService)
container.bind<IVariantService>(TYPES.SERVICES.IVariantService).to(VariantService)
container.bind<IAttributeService>(TYPES.SERVICES.IAttributeService).to(AttributeService)
container.bind<IEventBusService>(TYPES.SERVICES.IEventBusService).to(EventBusService)
container.bind<IUnitService>(TYPES.SERVICES.IUnitService).to(UnitService)
container.bind<ICartService>(TYPES.SERVICES.ICartService).to(CartService)
container.bind<IOrdersService>(TYPES.SERVICES.IOrdersService).to(OrdersService)
container.bind<IOptionService>(TYPES.SERVICES.IOptionService).to(OptionService)
container.bind<IUserService>(TYPES.SERVICES.IUserService).to(UserService)
container.bind<ICustomerService>(TYPES.SERVICES.ICustomerService).to(CustomerService)
container.bind<IMetaTagService>(TYPES.SERVICES.IMetaTagService).to(MetaTagService)
container.bind<IMerchantService>(TYPES.SERVICES.IMerchantService).to(MerchantService)
container.bind<ISettingsService>(TYPES.SERVICES.ISettingsService).to(SettingsService)
container.bind<ISiteService>(TYPES.SERVICES.ISiteService).to(SiteService)
container.bind<IFilterGroupService>(TYPES.SERVICES.IFilterGroupService).to(FilterGroupService)
container.bind<IFilterItemService>(TYPES.SERVICES.IFilterItemService).to(FilterItemService)
container.bind<IFavoritesService>(TYPES.SERVICES.IFavoritesService).to(FavoritesService)

// Gateways
container.bind<IProductGatewayService>(TYPES.GATEWAYS.IProductGatewayService).to(ProductGateway)
container.bind<ICartGatewayService>(TYPES.GATEWAYS.ICartGatewayService).to(CartGateway)
container.bind<IOrderGatewayService>(TYPES.GATEWAYS.IOrderGatewayService).to(OrderGateway)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SwaggerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductsController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(VariantController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AttributeController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AssetController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UnitController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CartController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(OrdersController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(OptionsController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UserController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CustomerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(MetaTagController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SettingsController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(FilterController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(FavoritesController)

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
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.ICategoryRepository).to(CategoryRepository)
container.bind<IProductsRepository>(TYPES.REPOSITORIES.IProductsRepository).to(ProductsRepository)
container.bind<IAssetsRepository>(TYPES.REPOSITORIES.IAssetsRepository).to(AssetRepository)
container.bind<IAttributeRepository>(TYPES.REPOSITORIES.IAttributeRepository).to(AttributeRepository)
container.bind<IVariantRepository>(TYPES.REPOSITORIES.IVariantRepository).to(VariantRepository)
container.bind<IUnitRepository>(TYPES.REPOSITORIES.IUnitRepository).to(UnitRepository)
container.bind<ICartRepository>(TYPES.REPOSITORIES.ICartRepository).to(CartRepository)
container.bind<IOrdersRepository>(TYPES.REPOSITORIES.IOrdersRepository).to(OrdersRepository)
container.bind<IOptionRepository>(TYPES.REPOSITORIES.IOptionRepository).to(OptionRepository)
container.bind<IUserRepository>(TYPES.REPOSITORIES.IUserRepository).to(UserRepository)
container.bind<ICustomerRepository>(TYPES.REPOSITORIES.ICustomerRepository).to(CustomerRepository)
container.bind<IMetaTagRepository>(TYPES.REPOSITORIES.IMetaTagRepository).to(MetaTagRepository)
container.bind<IMerchantRepository>(TYPES.REPOSITORIES.IMerchantRepository).to(MerchantRepository)
container.bind<ISettingsRepository>(TYPES.REPOSITORIES.ISettingsRepository).to(SettingsRepository)
container.bind<ISiteRepository>(TYPES.REPOSITORIES.ISiteRepository).to(SiteRepository)
container.bind<IFilterGroupRepository>(TYPES.REPOSITORIES.IFilterGroupRepository).to(FilterGroupRepository)
container.bind<IFilterItemRepository>(TYPES.REPOSITORIES.IFilterItemRepository).to(FilterItemRepository)
container.bind<IFavoritesRepository>(TYPES.REPOSITORIES.IFavoritesRepository).to(FavoritesRepository)

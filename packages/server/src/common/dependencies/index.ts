import 'reflect-metadata'
import App from '@app/app'
import { DB } from '@app/db'
import { Config } from '@app/config'
import { TYPES } from '../schemes/di-types'
import { Container } from 'inversify'

// Controllers
import { CategoryController } from '@modules/category/controller/category.controller'
import { ProductController } from '@modules/product/controller/product.controller'
import { AssetController } from '@modules/asset/controller/asset.controller'
import { AttributeController } from '@modules/attribute/controller/attribute.controller'
import { SwaggerController } from '@swagger/controller/swagger.controller'
import { VariantController } from '@modules/variant/controller/variant.controller'
import { UnitController } from '@modules/unit/controller/unit.controller'
import { CartController } from '@modules/cart/controller/cart.controller'
import { OrderController } from '@modules/order/controller/order.controller'
import { OptionController } from '@modules/option/controller/option.controller'
import { UserController } from '@modules/user/controller/user.controller'
import { CustomerController } from '@modules/customer/controller/customer.controller'
import { MetaTagController } from '@modules/metatag/controller/metatag.controller'
import { SettingsController } from '@modules/settings/controller/settings.controller'

// Services
import { LoggerService } from '../services/logger.service'
import { CategoryService } from '@modules/category/service/category.service'
import { ProductService } from '@modules/product/service/product.service'
import { VariantService } from '@modules/variant/service/variant.service'
import { AssetService } from '@modules/asset/service/asset.service'
import { AttributeService } from '@modules/attribute/service/attribute.service'
import { UnitService } from '@modules/unit/service/unit.service'
import { CartService } from '@modules/cart/service/cart.service'
import { OrderService } from '@modules/order/service/order.service'
import { OptionService } from '@modules/option/service/option.service'
import { EventBusService } from '@common/services/event-bus.service'
import { UserService } from '@modules/user/service/user.service'
import { CustomerService } from '@modules/customer/service/customer.service'
import { MetaTagService } from '@modules/metatag/service/metatag.service'
import { MerchantService } from '@modules/settings/service/merchant.service'

// Repositories
import { CategoryRepository } from '@modules/category/repository/category.repository'
import { ProductRepository } from '@modules/product/repository/product.repository'
import { VariantRepository } from '@modules/variant/repository/variant.repository'
import { AssetRepository } from '@modules/asset/repository/asset.repository'
import { AttributeRepository } from '@modules/attribute/repository/attribute.repository'
import { UnitRepository } from '@modules/unit/repository/unit.repository'
import { CartRepository } from '@modules/cart/repository/cart.repository'
import { OrderRepository } from '@modules/order/repository/order.repository'
import { OptionRepository } from '@modules/option/repository/option.repository'
import { UserRepository } from '@modules/user/repository/user.repository'
import { CustomerRepository } from '@modules/customer/repository/customer.repository'
import { MetaTagRepository } from '@modules/metatag/repository/metatag.repository'
import { MerchantRepository } from '@modules/settings/repository/merchant.repository'

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
import { ICategoryService } from '@modules/category/types/service'
import { IProductService } from '@modules/product/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IVariantService } from '@modules/variant/types/service'
import { IAttributeService } from '@modules/attribute/types/service'
import { IUnitService } from '@modules/unit/types/service'
import { ICartService } from '@modules/cart/types/service'
import { IOrderService } from '@modules/order/types/service'
import { IOptionService } from '@modules/option/types/service'
import { IUserService } from '@modules/user/types/service'
import { ICustomerService } from '@modules/customer/types/service'
import { IEventBusService } from '@/types/services'
import { ICategoryRepository } from '@modules/category/types/repository'
import { IMetaTagService } from '@modules/metatag/types/service'
import { IAssetsRepository } from '@modules/asset/types/repository'
import { IProductRepository } from '@modules/product/types/repository'
import { IVariantRepository } from '@modules/variant/types/repository'
import { IAttributeRepository } from '@modules/attribute/types/repository'
import { IUnitRepository } from '@modules/unit/types/repository'
import { IUserRepository } from '@modules/user/types/repository'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICartRepository } from '@modules/cart/types/repository'
import { IOrderRepository } from '@modules/order/types/repository'
import { IOptionRepository } from '@modules/option/types/repository'
import { IMetaTagRepository } from '@modules/metatag/types/repository'
import { ILogger } from '@/types/utils'
import { IConfig, IController, IDb } from '@/types'
import { IErrorRouteMiddleware, IExpressMiddleware, IFileLoaderMiddleware, IMiddleware, } from '@/types/middlewares'
import { AuthMiddleware } from '@common/middlewares/auth.middleware'
import { IMerchantService } from '@modules/settings/types/service'
import { IMerchantRepository } from '@modules/settings/types/repository'

export const container = new Container({ skipBaseClassChecks: true })

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)
container.bind<IProductService>(TYPES.SERVICES.IProductService).to(ProductService)
container.bind<IAssetsService>(TYPES.SERVICES.IAssetsService).to(AssetService)
container.bind<IVariantService>(TYPES.SERVICES.IVariantService).to(VariantService)
container.bind<IAttributeService>(TYPES.SERVICES.IAttributeService).to(AttributeService)
container.bind<IEventBusService>(TYPES.SERVICES.IEventBusService).to(EventBusService)
container.bind<IUnitService>(TYPES.SERVICES.IUnitService).to(UnitService)
container.bind<ICartService>(TYPES.SERVICES.ICartService).to(CartService)
container.bind<IOrderService>(TYPES.SERVICES.IOrderService).to(OrderService)
container.bind<IOptionService>(TYPES.SERVICES.IOptionService).to(OptionService)
container.bind<IUserService>(TYPES.SERVICES.IUserService).to(UserService)
container.bind<ICustomerService>(TYPES.SERVICES.ICustomerService).to(CustomerService)
container.bind<IMetaTagService>(TYPES.SERVICES.IMetaTagService).to(MetaTagService)
container.bind<IMerchantService>(TYPES.SERVICES.IMerchantService).to(MerchantService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SwaggerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(VariantController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AttributeController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AssetController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UnitController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CartController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(OrderController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(OptionController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UserController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CustomerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(MetaTagController)
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
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.ICategoryRepository).to(CategoryRepository)
container.bind<IProductRepository>(TYPES.REPOSITORIES.IProductRepository).to(ProductRepository)
container.bind<IAssetsRepository>(TYPES.REPOSITORIES.IAssetsRepository).to(AssetRepository)
container.bind<IAttributeRepository>(TYPES.REPOSITORIES.IAttributeRepository).to(AttributeRepository)
container.bind<IVariantRepository>(TYPES.REPOSITORIES.IVariantRepository).to(VariantRepository)
container.bind<IUnitRepository>(TYPES.REPOSITORIES.IUnitRepository).to(UnitRepository)
container.bind<ICartRepository>(TYPES.REPOSITORIES.ICartRepository).to(CartRepository)
container.bind<IOrderRepository>(TYPES.REPOSITORIES.IOrderRepository).to(OrderRepository)
container.bind<IOptionRepository>(TYPES.REPOSITORIES.IOptionRepository).to(OptionRepository)
container.bind<IUserRepository>(TYPES.REPOSITORIES.IUserRepository).to(UserRepository)
container.bind<ICustomerRepository>(TYPES.REPOSITORIES.ICustomerRepository).to(CustomerRepository)
container.bind<IMetaTagRepository>(TYPES.REPOSITORIES.IMetaTagRepository).to(MetaTagRepository)
container.bind<IMerchantRepository>(TYPES.REPOSITORIES.IMerchantRepository).to(MerchantRepository)

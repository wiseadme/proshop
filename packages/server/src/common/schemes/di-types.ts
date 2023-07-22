import { IProductGatewayService } from '@modules/product/gateway/gateway.service'

export const TYPES = {
    APPLICATION: Symbol.for('App'),
    DB: Symbol.for('DB'),
    REDIS: Symbol.for('REDIS'),
    CONFIG: Symbol.for('CONFIG'),
    SERVICES: {
        ICategoryService: Symbol.for('ICategoryService'),
        IProductService: Symbol.for('IProductService'),
        IAssetsService: Symbol.for('IAssetsService'),
        IVariantService: Symbol.for('IVariantService'),
        IEventBusService: Symbol.for('IEventBusService'),
        IAttributeService: Symbol.for('IAttributeService'),
        IUnitService: Symbol.for('IUnitService'),
        ICartService: Symbol.for('ICartService'),
        IOrderService: Symbol.for('IOrderService'),
        IOptionService: Symbol.for('IOptionService'),
        IUserService: Symbol.for('IUserService'),
        ICustomerService: Symbol.for('ICustomerService'),
        IMetaTagService: Symbol.for('IMetaTagService'),
        IMerchantService: Symbol.for('IMerchantService'),
        ISettingsService: Symbol.for('ISettingsService'),
        ISiteService: Symbol.for('ISiteService'),
        IFilterGroupService: Symbol.for('IFilterGroupService'),
        IProductGatewayService: Symbol.for('IProductGatewayService')
    },
    CONTROLLERS: {
        IController: Symbol.for('IController'),
    },
    UTILS: {
        ILogger: Symbol.for('ILogger'),
    },
    REPOSITORIES: {
        ICategoryRepository: Symbol.for('ICategoryRepository'),
        IProductRepository: Symbol.for('IProductRepository'),
        IAssetsRepository: Symbol.for('IAssetsRepository'),
        IVariantRepository: Symbol.for('IVariantRepository'),
        IAttributeRepository: Symbol.for('IAttributeRepository'),
        IUnitRepository: Symbol.for('IUnitRepository'),
        ICartRepository: Symbol.for('ICartRepository'),
        IOrderRepository: Symbol.for('IOrderRepository'),
        IOptionRepository: Symbol.for('IOptionRepository'),
        IUserRepository: Symbol.for('IUserRepository'),
        ICustomerRepository: Symbol.for('ICustomerRepository'),
        IMetaTagRepository: Symbol.for('IMetaTagRepository'),
        IMerchantRepository: Symbol.for('IMerchantRepository'),
        ISettingsRepository: Symbol.for('ISettingsRepository'),
        ISiteRepository: Symbol.for('ISiteRepository'),
        IFilterGroupRepository: Symbol.for('IFilterGroupRepository')
    },
    MIDDLEWARES: {
        IMiddleware: Symbol.for('IMiddleware'),
        ICorsMiddleware: Symbol.for('ICorsMiddleware'),
        IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
        IFileLoaderMiddleware: Symbol.for('IFileLoaderMiddleware'),
        ISessionMiddleware: Symbol.for('ISessionMiddleware'),
    },
}

export const TYPES = {
    APPLICATION: Symbol.for('App'),
    DB: Symbol.for('DB'),
    REDIS: Symbol.for('REDIS'),
    CONFIG: Symbol.for('CONFIG'),
    CONTROLLERS: {
        IController: Symbol.for('IController'),
    },
    UTILS: {
        ILogger: Symbol.for('ILogger'),
    },
    SERVICES: {
        IVariantService: Symbol.for('IVariantService'),
        IEventBusService: Symbol.for('IEventBusService'),
        IUnitService: Symbol.for('IUnitService'),
        IUserService: Symbol.for('IUserService'),
        IMerchantService: Symbol.for('IMerchantService'),
        ISettingsService: Symbol.for('ISettingsService'),
        ISiteService: Symbol.for('ISiteService'),
    },
    GATEWAYS: {
        IProductGatewayService: Symbol.for('IProductGatewayService'),
    },
    REPOSITORIES: {
        IVariantRepository: Symbol.for('IVariantRepository'),
        IUnitRepository: Symbol.for('IUnitRepository'),
        IUserRepository: Symbol.for('IUserRepository'),
        IMerchantRepository: Symbol.for('IMerchantRepository'),
        ISettingsRepository: Symbol.for('ISettingsRepository'),
        ISiteRepository: Symbol.for('ISiteRepository'),
    },
    MIDDLEWARES: {
        IMiddleware: Symbol.for('IMiddleware'),
        ICorsMiddleware: Symbol.for('ICorsMiddleware'),
        IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
        IFileLoaderMiddleware: Symbol.for('IFileLoaderMiddleware'),
        ISessionMiddleware: Symbol.for('ISessionMiddleware'),
    },
}

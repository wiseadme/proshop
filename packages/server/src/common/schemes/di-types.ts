import { IAuthRepository } from '@modules/auth/types/repository'

export const TYPES = {
  APPLICATION: Symbol.for('App'),
  DB: Symbol.for('DB'),
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
    IAuthService: Symbol.for('IAuthService')
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
    IAuthRepository: Symbol.for('IAuthRepository'),
  },
  MIDDLEWARES: {
    IMiddleware: Symbol.for('IMiddleware'),
    IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
    IFileLoaderMiddleware: Symbol.for('IFileLoaderMiddleware'),
    IKeycloakMiddleware: Symbol.for('IKeycloakMiddleware'),
    ISessionMiddleware: Symbol.for('ISessionMiddleware')
  }
}
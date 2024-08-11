export const PRODUCTS_IOC = {
    IProductsService: Symbol.for('IProductsService'),
    IProductsRepository: Symbol.for('IProductsRepository'),
    IProductsGatewayService: Symbol.for('IProductsGatewayService'),
    IProductMongoRepositoryHelpers: Symbol.for('IProductMongoRepositoryHelpers')
}

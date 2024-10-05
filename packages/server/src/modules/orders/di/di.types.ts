export const ORDER_IOC = {
    IOrdersService: Symbol.for('IOrdersService'),
    IOrdersRepository: Symbol.for('IOrdersRepository'),
    IOrderGatewayService: Symbol.for('IOrderGatewayService'),
    IOrdersMiddlewares: Symbol.for('IOrdersMiddlewares'),
    IOrdersHelpers: Symbol.for('IOrdersHelpers'),
}

export enum OrderStatus {
    CREATED = 'created',
    SEEN = 'seen',
    CONFIRMED = 'confirmed',
    IN_PROCESS = 'inProcess',
    READY = 'ready',
    IN_DELIVERY = 'inDelivery',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum OrderProcessStatuses {
    inProcess = OrderStatus.IN_PROCESS,
    ready = OrderStatus.READY,
    inDelivery = OrderStatus.IN_DELIVERY,
    completed = OrderStatus.COMPLETED
}

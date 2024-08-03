import type { ICart } from '@proshop-app/types'

export class Cart implements ICart {
    readonly id: string
    public items: ICart['items']
    public currency: ICart['currency']
    readonly customerId: ICart['customerId']
    public totalUniqueItems: ICart['totalUniqueItems']
    readonly totalItems: ICart['totalItems']
    public amount: ICart['amount']
    readonly orderId: ICart['orderId']

    constructor({
        id = '',
        items,
        currency = null,
        customerId = null,
        orderId = null
    }: ICart) {
        this.id = id
        this.currency = currency
        this.customerId = customerId
        this.totalUniqueItems = 0
        this.totalItems = items.length
        this.items = items.map(it => {
            it.amount = it.price * it.quantity

            return it
        })
        this.amount = 0
        this.orderId = orderId

        this.unmarshal()
    }

    public setTotalUniqueItems() {
        this.totalUniqueItems = this.items.reduce((acc, it) => acc + it.quantity, 0)
    }

    public setItemsWithAmount() {
        this.items = this.items.map(it => {
            it.amount = it.price * it.quantity

            return it
        })
    }

    public setCartAmount() {
        this.amount = this.items.reduce((acc, it) => {
            acc += it.price * it.quantity

            return acc
        }, 0)
    }

    public unmarshal() {
        this.setTotalUniqueItems()
        // this.setItemsWithAmount()
        this.setCartAmount()
    }

    static create(cart: ICart) {
        return new Cart(cart)
    }
}

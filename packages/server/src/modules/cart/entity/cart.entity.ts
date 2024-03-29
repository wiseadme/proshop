import { ICart } from '@proshop/types'

export class Cart implements ICart {
    readonly id: string
    public items: ICart['items']
    public currency: ICart['currency']
    readonly ownerId: ICart['ownerId']
    public totalUniqueItems: ICart['totalUniqueItems']
    readonly totalItems: ICart['totalItems']
    public amount: ICart['amount']
    readonly orderId: ICart['orderId']

    constructor({
        id = '',
        items,
        currency = null,
        ownerId = null,
        orderId = null
    }: ICart) {
        this.id = id
        this.currency = currency
        this.ownerId = ownerId
        this.totalUniqueItems = 0
        this.totalItems = items.length
        this.items = items.map(it => {
            it.amount = it.product.price * it.quantity

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
            it.amount = it.product.price * it.quantity

            return it
        })
    }

    public setCartAmount() {
        this.amount = this.items.reduce((acc, it) => {
            if (it.variant?.option.price) {
                acc += it.variant.option.price * it.quantity
            } else {
                acc += it.product.price * it.quantity
            }
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

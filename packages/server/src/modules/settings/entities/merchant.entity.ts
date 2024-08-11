import { IMerchant } from '@proshop-app/types'

export class Merchant implements IMerchant {
    readonly id: IMerchant['id']
    readonly organization: IMerchant['organization']
    readonly name: IMerchant['name']
    readonly description: IMerchant['description']
    readonly logo: IMerchant['logo']
    readonly slogan: IMerchant['slogan']
    readonly address: IMerchant['address']
    readonly email: IMerchant['email']
    readonly phone: IMerchant['phone']
    readonly currency: IMerchant['currency']
    readonly stores: IMerchant['stores']
    readonly social: IMerchant['social']

    constructor({
        id = '',
        organization,
        name,
        currency,
        description = null,
        logo = null,
        slogan = null,
        address = null,
        email = null,
        phone = null,
        stores = [],
        social = null,
    }: IMerchant) {
        this.id = id
        this.organization = organization
        this.name = name
        this.currency = currency
        this.description = description
        this.logo = logo
        this.slogan = slogan
        this.address = address
        this.email = email
        this.email = email
        this.phone = phone
        this.stores = stores
        this.social = social
    }

    static create(merchant: IMerchant) {
        return new Merchant(merchant)
    }
}

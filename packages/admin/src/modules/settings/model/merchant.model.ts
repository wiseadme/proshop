import type { IMerchant } from '@proshop-app/types'

export class Merchant implements IMerchant {
    public readonly id: IMerchant['id']
    public organization: IMerchant['organization']
    public name: IMerchant['name']
    public description: IMerchant['description']
    public logo: IMerchant['logo']
    public slogan: IMerchant['slogan']
    public address: IMerchant['address']
    public email: IMerchant['email']
    public phone: IMerchant['phone']
    public currency: IMerchant['currency']
    public stores: IMerchant['stores']
    public social: IMerchant['social']

    constructor({
        id = '',
        organization,
        name = null,
        description = null,
        logo = null,
        slogan = null,
        address = null,
        email = null,
        phone = null,
        currency,
        stores = null,
        social = {
            vk: '',
            facebook: '',
            instagram: '',
        },
    }: IMerchant) {
        this.id = id
        this.organization = organization
        this.name = name
        this.description = description
        this.logo = logo
        this.slogan = slogan
        this.address = address
        this.email = email
        this.phone = phone
        this.currency = currency
        this.stores = stores
        this.social = social
    }

    static create(merchant = {} as IMerchant) {
        return new Merchant(merchant)
    }
}



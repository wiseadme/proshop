import { IAttribute } from '@proshop-app/types'

export class Attribute implements IAttribute {
    id: IAttribute['id']
    key: IAttribute['key']
    value: IAttribute['value']
    meta: IAttribute['meta']
    order: IAttribute['order']

    constructor({ id = '', key = '', value = '', meta = '', order = 0 }){
        this.id = id
        this.key = key
        this.value = value
        this.meta = meta
        this.order = order
    }

    static create(attribute = {}){
        return new Attribute(attribute)
    }
}

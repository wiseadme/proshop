import { IOption, Maybe } from '@proshop/types'
import { translator } from '@common/utils/translator'
export class Option implements IOption {
    private _name: string
    private _variantId: string
    private _price?: number
    private _quantity?: number
    private _description?: Maybe<string>
    private _assets?: string[]
    private _url?: string

    constructor({
        name = '',
        price = 0,
        quantity = 0,
        description = null,
        assets = [],
        variantId = '',
        url = ''
    }: IOption) {
        this._name = name
        this._price = price
        this._quantity = quantity
        this._description = description
        this._assets = assets
        this._variantId = variantId
        this._url = url ? translator(url.toLowerCase()) : undefined
    }

    get name() {
        return this._name
    }

    get variantId() {
        return this._variantId
    }

    get price() {
        return this._price
    }

    get quantity() {
        return this._quantity
    }

    get description() {
        return this._description
    }

    get assets() {
        return this._assets
    }

    get url() {
        return this._url
    }

    static create(option: IOption): IOption {
        return new Option(option)
    }
}

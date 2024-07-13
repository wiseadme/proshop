import { IProductState } from '@modules/products/types'

export const state = (): IProductState => ({
    products: null,
    categoryProducts: null,
    totalLength: 0
})

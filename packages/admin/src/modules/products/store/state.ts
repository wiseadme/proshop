import { IProductState } from '@modules/products/types'

export const state = () => ({
    products: null,
    categoryProducts: null,
    totalLength: 0
}) as IProductState

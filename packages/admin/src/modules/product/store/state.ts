import { IProductState } from '@modules/product/types'

export const state = () => ({
    products: null,
    categoryProducts: null,
    totalLength: 0
}) as IProductState

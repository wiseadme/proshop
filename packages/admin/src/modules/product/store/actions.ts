import { useProductRepository } from '@modules/product/repository'
import {
    IProduct,
    IProductQuery,
    IRequestParams
} from '@proshop/types'
import { IProductActions } from '../types'

const productRepository = useProductRepository()

export const actions: IProductActions = {
    async create(product: IProduct) {
        try {
            const { data } = await productRepository.create(product)

            this.$patch(state => {
                state.products.push(data.data.items[0])
                state.totalLength = data.data.total
            })

            return data.data.items[0]
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params: IRequestParams<IProductQuery>) {
        try {
            const { data } = await productRepository.read(params)

            this.$patch(state => {
                if (params.category) {
                    state.categoryProducts = data.data.items
                } else {
                    state.products = data.data?.items
                    state.totalLength = data.data?.total
                }
            })

            return data.data?.items
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async update(updates) {
        try {
            const { data } = await productRepository.update(updates)

            this.products = Array.from(this.products, (pr: IProduct) => {
                if (pr.id === updates.id) {
                    return data.data
                }

                return pr
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async delete(product: IProduct) {
        try {
            const response = await productRepository.delete(product.id)
            this.products = this.products.filter(it => it.id !== product.id)
            this.totalLength -= 1

            return response?.data.data
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

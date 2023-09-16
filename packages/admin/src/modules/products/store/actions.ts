import { useProductRepository } from '@modules/products/repository'
import {
    IAttribute,
    IProduct,
    IProductQuery,
    IRequestParams,
} from '@proshop/types'

const productRepository = useProductRepository()

export const actions = {
    async create(product: IProduct) {
        try {
            const { data } = await productRepository.create(product)

            this.$patch((state) => {
                state.products.push(data.data)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async read(params: IRequestParams<IProductQuery>) {
        try {
            const { data } = await productRepository.read(params)

            this.$patch(state => {
                state.products = data.data?.items
                state.totalLength = data.data?.total
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
    },

    async addAttribute(params: { productId: string, attribute: IAttribute }) {
        try {
            const { data } = await productRepository.addAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => {
                    if (it.id === params.productId) return data.data

                    return it
                })
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteAttribute(params: { productId: string, attributeId: string }) {
        try {
            const { data } = await productRepository.deleteAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => {
                    if (it.id === params.productId) return data.data

                    return it
                })
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}

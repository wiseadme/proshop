import { useProductRepository } from '@modules/products/repository'
import {
    IAttribute,
    IMetaTag,
    IOption,
    IProduct,
    IProductQuery,
    IRequestParams,
    IVariant
} from '@proshop/types'

const repository = useProductRepository()

export const actions = {
    async createProduct(product: IProduct) {
        try {
            const { data } = await repository.createProduct(product)

            this.$patch((state) => {
                state.products.push(data.data)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getProducts(params: IRequestParams<IProductQuery>) {
        try {
            const { data } = await repository.getProducts(params)

            this.$patch(state => {
                state.products = data.data?.items
                state.totalLength = data.data?.total
            })

            return data.data?.items
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateProduct(updates) {
        try {
            const { data } = await repository.updateProduct(updates)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === updates.id ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteProduct(product: IProduct) {
        try {
            const response = await repository.deleteProduct(product.id)
            this.products = this.products.filter(it => it.id !== product.id)
            this.totalLength -= 1

            return response?.data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addAttribute(params: { productId: string, attribute: IAttribute }) {
        try {
            const { data } = await repository.addAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteAttribute(params: { productId: string, attributeId: string }) {
        try {
            const { data } = await repository.deleteAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addMetaTag(params: { productId: string, metaTag: IMetaTag }) {
        try {
            const { data } = await repository.addMetaTag(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateMetaTags(params: { productId: string, metaTags: IMetaTag [] }) {
        try {
            const { data } = await repository.updateMetaTags(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteMetaTag(params: { productId: string, metaTagId: string }) {
        try {
            const { data } = await repository.deleteMetaTag(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addVariant(params: { productId: string, variant: IVariant }) {
        try {
            const { data } = await repository.addVariant(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addVariantOption(params: { productId: string, option: IOption }) {
        try {
            const { data } = await repository.addVariantOption(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data.data : it)
            })

            return data.data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}

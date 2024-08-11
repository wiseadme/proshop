import {
    useProductRepository
} from '@modules/products/composables/repository/use-products-repository'

import type {
    IAttribute,
    IMetaTag,
    IProduct,
    IProductParams,
    IProductQuery,
    IRequestParams,
} from '@proshop-app/types'

const repository = useProductRepository()

export const actions = {
    async createProduct(product: IProduct) {
        try {
            const { data } = await repository.createProduct(product)

            this.$patch((state) => {
                state.products.push(data)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async getProducts(params: IRequestParams<IProductQuery>) {
        try {
            const { data } = await repository.getProducts(params)

            this.$patch(state => {
                state.products = data?.items
                state.totalLength = data?.total
            })

            return data?.items
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateProduct(updates: Partial<IProductParams>) {
        try {
            const { data } = await repository.updateProduct(updates)

            /**
             * TODO - зарефакторить, if добавлен из - за вызова апдейта
             * из другого модуля (groups), в то время как products не были проинициализированы
             */
            if (this.products) {
                this.$patch((state) => {
                    state.products = state.products.map(it => it.id === updates.id ? data : it)
                })
            }

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteProduct(product: IProduct) {
        try {
            const { data } = await repository.deleteProduct(product.id)
            this.products = this.products.filter(it => it.id !== product.id)
            this.totalLength -= 1

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addAttribute(params: { id: string, attribute: IAttribute }) {
        try {
            const { data } = await repository.addAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.id ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteAttribute(params: { id: string, attributeId: string }) {
        try {
            const { data } = await repository.deleteAttribute(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.id ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async addMetaTag(params: { productId: string, metaTag: IMetaTag }) {
        try {
            const { data } = await repository.addMetaTag(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async updateMetaTags(params: { productId: string, metaTags: IMetaTag [] }) {
        try {
            const { data } = await repository.updateMetaTags(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },

    async deleteMetaTag(params: { productId: string, metaTagId: string }) {
        try {
            const { data } = await repository.deleteMetaTag(params)

            this.$patch((state) => {
                state.products = state.products.map(it => it.id === params.productId ? data : it)
            })

            return data
        } catch (err) {
            return Promise.reject(err)
        }
    },
}

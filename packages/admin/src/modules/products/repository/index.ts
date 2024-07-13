import {
    IAttribute,
    IMetaTag,
    IProduct,
    IProductConditions,
    IProductParams,
    IProductQuery,
    IRequestParams
} from '@proshop/types'

import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'

class Repository {
    client: IRest<IProduct>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    createProduct(product: Partial<IProduct>) {
        return this.client.post(this.path, product)
    }

    getProducts(params: IRequestParams<IProductQuery>) {
        return this.client.get(this.path, params ? { params } : {})
    }

    updateProduct(updates: Partial<IProductParams>) {
        return this.client.patch(this.path, updates)
    }

    addAttribute(params: { id: string, attribute: IAttribute }) {
        return this.client.patch(`${this.path}/attributes/add`, params)
    }

    deleteAttribute(params: { id: string, attributeId: string }) {
        return this.client.patch(`${this.path}/attributes/delete`, params)
    }

    addMetaTag(params: { productId: string, metaTag: IMetaTag }) {
        return this.client.patch(`${this.path}/metatags/add`, params)
    }

    deleteMetaTag(params: { productId: string, metaTagId: string }) {
        return this.client.patch(`${this.path}/metatags/delete`, params)
    }

    updateMetaTags(params: { productId: string, metaTags: IMetaTag [] }) {
        return this.client.patch(`${this.path}/metatags/update`, params)
    }

    updateConditions(params: { productId: string, conditions: IProductConditions }) {
        return this.client.patch(`${this.path}/update`, params)
    }

    deleteProduct(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useProductRepository = () => new Repository({
    client: rest.client,
    path: '/api/v1/products',
})

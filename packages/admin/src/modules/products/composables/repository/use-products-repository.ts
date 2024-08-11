import { useSharedHttp } from '@shared/composables/use-http'

import type {
    IAttribute,
    IMetaTag,
    IProduct,
    IProductParams,
    IProductQuery,
    IRequestParams
} from '@proshop-app/types'

export interface IProductRepository {
    createProduct(product: IProduct): Promise<{ data: IProduct, ok: boolean }>

    getProducts(params: IRequestParams<IProductQuery>): Promise<{
        data: { items: IProduct[], total: number },
        ok: boolean
    }>

    updateProduct(updates: Partial<IProductParams>): Promise<{ data: IProduct, ok: boolean }>

    deleteProduct(id: string): Promise<{ data: boolean, ok: boolean }>

    addAttribute(data: { id: string, attribute: IAttribute }): Promise<{ data: IProduct, ok: boolean }>

    deleteAttribute(data: { id: string, attributeId: string }): Promise<{ data: IProduct, ok: boolean }>

    addMetaTag(data: { productId: string, metaTag: IMetaTag }): Promise<{ data: IProduct, ok: boolean }>

    updateMetaTags(data: { productId: string, metaTags: IMetaTag[] }): Promise<{ data: IProduct, ok: boolean }>

    deleteMetaTag(data: { productId: string, metaTagId: string }): Promise<{ data: IProduct, ok: boolean }>

    cancel(): void
}

export const useProductRepository = (): IProductRepository => {
    const { request, cancel } = useSharedHttp()

    const createProduct = (product: IProduct) => request({
        url: '/api/v1/products',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: product
    })

    const getProducts = (params: IRequestParams<IProductQuery> = {}) => request({
        url: '/api/v1/products',
        params
    })

    const updateProduct = (updates: Partial<IProductParams>) => request({
        url: '/api/v1/products',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: updates,
    })

    const deleteProduct = (id: string) => request({
        url: '/api/v1/products',
        method: 'DELETE',
        params: { id }
    })

    const addAttribute = (data: { id: string, attribute: IAttribute }) => request({
        url: '/api/v1/products/attributes/add',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: data,
    })

    const deleteAttribute = (data: { id: string, attributeId: string }) => request({
        url: '/api/v1/products/attributes/delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: data,
    })

    const addMetaTag = (data: { productId: string, metaTag: IMetaTag }) => request({
        url: '/api/v1/products/metatags/add',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: data,
    })

    const updateMetaTags = (data: { productId: string, metaTags: IMetaTag[] }) => request({
        url: '/api/v1/products/metatags/update',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: data,
    })

    const deleteMetaTag = (data: { productId: string, metaTagId: string }) => request({
        url: '/api/v1/products/metatags/delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'PATCH',
        body: data,
    })

    return {
        createProduct,
        getProducts,
        updateProduct,
        deleteProduct,
        addAttribute,
        deleteAttribute,
        addMetaTag,
        deleteMetaTag,
        updateMetaTags,
        cancel
    }
}

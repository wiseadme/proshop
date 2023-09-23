import { IAttribute, IMetaTag, IOption, IProduct, IProductQuery, IRequestParams, IVariant } from '@proshop/types'

export interface IProductsRepository {
    createProduct(product: IProduct): Promise<IProduct>

    find(query: Partial<IProduct>): Promise<IProduct[]>

    findById(id: string): Promise<IProduct>

    findByQueryString(name: string): Promise<IProduct[]>

    findByUrl(url: string): Promise<IProduct>

    findByCategory(params: IRequestParams<IProductQuery>): Promise<IProduct[]>

    updateProduct(updates: Partial<IProduct>): Promise<{ updated: IProduct }>

    deleteProduct(id: string): Promise<boolean>

    addAttribute(params: { productId: string, attribute: IAttribute }): Promise<IProduct>

    addVariant(params: { productId: string, variant: IVariant }): Promise<IProduct>

    addVariantOption(params: { productId: string, option: IOption }): Promise<IProduct>

    deleteAttribute(params: { productId: string, attributeId: string }): Promise<IProduct>

    addMetaTag(params: { productId: string, metaTag: IMetaTag }): Promise<IProduct>

    updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }): Promise<IProduct>

    deleteMetaTag(params: { productId: string, metaTagId: string }): Promise<IProduct>

    getDocumentsCount(params?: any): Promise<number>
}

import {
    IAttribute,
    IMetaTag,
    IProduct,
    IProductParams,
    IProductQuery,
    IRequestParams,
} from '@proshop-app/types'

export interface IProductsRepository {
    createProduct(product: IProductParams): Promise<IProduct>

    find(query: Partial<IProduct>): Promise<IProduct[]>

    findById(id: string): Promise<IProduct>

    findByQueryString(name: string): Promise<IProduct[]>

    findByUrl(url: string): Promise<IProduct>

    findBySKU(sku: string): Promise<IProduct>

    findByCategory(params: IRequestParams<IProductQuery>): Promise<IProduct[]>

    updateProduct(updates: Partial<IProductParams>): Promise<IProduct>

    deleteProduct(id: string): Promise<boolean>

    addAttribute(params: { id: string, attribute: IAttribute }): Promise<IProduct>

    deleteAttribute(params: { id: string, attributeId: string }): Promise<IProduct>

    addMetaTag(params: { productId: string, metaTag: IMetaTag }): Promise<IProduct>

    updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }): Promise<IProduct>

    deleteMetaTag(params: { productId: string, metaTagId: string }): Promise<IProduct>

    getDocumentsCount(params?: any): Promise<number>
}

export interface IProductMongoRepositoryHelpers {
    getPaginationParams(...args: any[]): any

    getSortParams(...args: any[]): any

    getAssetsPopulateParams(): any

    getCategoriesPopulateParams(): any

    getVariantsPopulateParams(): any

    getRelatedPopulateParams(): any

    getProductPopulateParams(): any

    prepareAggregateParams(...args: any[]): any
}

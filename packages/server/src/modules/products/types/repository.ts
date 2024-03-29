import {
    IAttribute,
    IMetaTag,
    IOption,
    IProduct,
    IProductParams,
    IProductQuery,
    IRequestParams,
    IVariant,
} from '@proshop/types'

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

    addVariant(params: { variant: IVariant }): Promise<IProduct>

    deleteVariant(params: { variant: IVariant }): Promise<IProduct>

    addVariantOption(params: { option: IOption }): Promise<IProduct>

    deleteVariantOption(params: { option: IOption }): Promise<IProduct>

    deleteAttribute(params: { id: string, attributeId: string }): Promise<IProduct>

    addMetaTag(params: { productId: string, metaTag: IMetaTag }): Promise<IProduct>

    updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }): Promise<IProduct>

    deleteMetaTag(params: { productId: string, metaTagId: string }): Promise<IProduct>

    getDocumentsCount(params?: any): Promise<number>
}

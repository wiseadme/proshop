import { IAttribute, IMetaTag, IOption, IProduct, IProductParams, IRequestParams, IVariant } from '@proshop/types'

export interface IProductsService {
    createProduct(product: IProductParams): Promise<IProduct>

    getProducts(query: IRequestParams<Partial<IProduct>>): Promise<{ items: IProduct[], total?: number }>,

    updateProduct(updates: Partial<IProductParams>): Promise<IProduct>

    deleteProduct(id: string): Promise<boolean>

    addAttribute(params: { id: string, attribute: IAttribute }): Promise<IProduct>

    deleteAttribute(params: { id: string, attributeId: string }): Promise<IProduct>

    addMetaTag(params: { productId: string, metaTag: IMetaTag }): Promise<IProduct>

    updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }): Promise<IProduct>

    deleteMetaTag(params: { productId: string, metaTagId: string }): Promise<IProduct>
}

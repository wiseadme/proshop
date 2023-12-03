import { LeanDocument } from 'mongoose'
import { IAttribute, IMetaTag, IOption, IProduct, IProductParams, IRequestParams, IVariant } from '@proshop/types'

export interface IProductsService {
    createProduct(product: IProductParams): Promise<IProduct>

    getProducts(query: IRequestParams<Partial<IProduct>>): Promise<{ items: IProduct[], total?: number }>,

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
}

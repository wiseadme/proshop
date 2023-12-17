import mongoose from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/products/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductsRepository } from '../types/repository'
import {
    IAttribute,
    IMetaTag, IOption,
    IProduct,
    IProductMongoModel, IProductParams,
    IProductQuery,
    IRequestParams,
    IVariant,
} from '@proshop/types'
import { ILogger } from '@/types/utils'
import { RepositoryHelpers } from '@modules/products/helpers/repository.helpers'

import { ProductMapper } from '@modules/products/mappers/product.mapper'
import { SkuGenerator } from '@common/plugins/sku-generator'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'
import * as queryString from 'querystring'

@injectable()
export class ProductsRepository extends RepositoryHelpers implements IProductsRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
        super()
    }

    async createProduct(product: IProductParams) {
        const productData = await new ProductModel({
            ...ProductMapper.toMongoModelData(product),
            _id: new mongoose.Types.ObjectId(),
        })
            .save()

        await productData.populate(this.getPopulateParams())

        return ProductMapper.toDomain(productData.toObject())
    }

    async find(query: IRequestParams<IProductQuery>) {
        const { page, count, desc, asc, key } = query

        const queryParams = {
            ...this.getPaginationParams({ page, count }),
            ...this.getSortParams({ desc, asc, key }),
        }

        const products = await ProductModel
            .find({}, [], queryParams)
            .lean()
            .populate(this.getPopulateParams())

        return products.map(product => ProductMapper.toDomain(product))
    }

    async findById(id: string): Promise<IProduct> {
        validateId(id)

        const product = await ProductModel
            .findById(id)
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async findByQueryString(queryString: string) {
        const products = await ProductModel
            .find({ name: new RegExp(queryString, 'i') })
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel[]

        return products.map(product => ProductMapper.toDomain(product))
    }

    async findBySKU(sku) {
        const product = await ProductModel
            .findOne({ sku })
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async findByUrl(url: string) {
        const [product] = await ProductModel
            .find({ url })
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel[]

        return ProductMapper.toDomain(product)
    }

    async findByCategory({
        category,
        desc,
        asc,
        key,
        page = DEFAULT_PAGE,
        count = DEFAULT_ITEMS_COUNT,
    }: IRequestParams<IProductQuery>) {
        const products = await ProductModel
            .aggregate(this.prepareAggregateParams({
                count,
                page,
                category,
                desc,
                asc,
                key,
            }))
            .exec()

        await ProductModel.populate(products, this.getPopulateParams())

        return products.map(product => ProductMapper.toDomain(product))
    }

    async updateProduct($set: Partial<IProductParams>) {
        validateId($set.id)

        const updated = await ProductModel.findByIdAndUpdate(
            { _id: $set.id },
            { $set: ProductMapper.toMongoModelData($set) },
            { new: true },
        )
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel

        return ProductMapper.toDomain(updated)
    }

    async deleteProduct(id: string) {
        validateId(id)

        await ProductModel.findOneAndDelete({ _id: id })

        return true
    }

    async addAttribute(params: { id: string, attribute: IAttribute }) {
        validateId(params.id)

        const product = await ProductModel.findOneAndUpdate({ _id: params.id }, {
            $push: { attributes: params.attribute },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async deleteAttribute(params: { id: string, attributeId: string }) {
        validateId(params.id)

        const product = await ProductModel.findOneAndUpdate({ _id: params.id }, {
            $pull: { attributes: { id: params.attributeId } },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async addMetaTag(params: { productId: string, metaTag: IMetaTag }) {
        validateId(params.productId)
        const { productId, metaTag } = params

        const product = await ProductModel.findOneAndUpdate({ _id: productId }, {
            $push: { 'seo.metatags': metaTag },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async updateMetaTags(params: { productId: string, metaTags: IMetaTag[] }) {
        validateId(params.productId)

        const found = await ProductModel.findOne({ _id: params.productId }).lean()

        // TODO - заменить позже апдейт всего массива на более оптимальное решение
        const metaTagsMap = {
            ...found!.seo.metatags.reduce((map, it) => {
                map[it.id] = it

                return map
            }, {}),
            ...params.metaTags.reduce((map, it) => {
                map[it.id] = it

                return map
            }, {}),
        }

        const product = await ProductModel
            .findOneAndUpdate(
                { _id: params.productId },
                { $set: { 'seo.metatags': Object.values(metaTagsMap) } },
                { new: true }
            )
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async deleteMetaTag(params: { productId: string, metaTagId: string }) {
        validateId(params.productId)

        const product = await ProductModel.findOneAndUpdate({ _id: params.productId }, {
            $pull: { 'seo.metatags': { id: params.metaTagId } },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async addVariant(params: { variant: IVariant }) {
        validateId(params.variant.ownerId)

        const product = await ProductModel.findOneAndUpdate({ _id: params.variant.ownerId }, {
            $push: { 'variants': params.variant },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async deleteVariant(params: { variant: IVariant }): Promise<IProduct> {
        validateId(params.variant.ownerId)

        const product = await ProductModel.findOneAndUpdate({ _id: params.variant.ownerId }, {
            $pull: { variants: { id: params.variant.id } },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async addVariantOption(params: { option: IOption }) {
        validateId(params.option.ownerId)

        const product = await ProductModel.findOneAndUpdate({
            _id: params.option.ownerId,
            variants: {
                $elemMatch: { id: params.option.variantId },
            },
        }, {
            $push: { 'variants.$.options': params.option.id },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async deleteVariantOption(params: { option: IOption }) {
        validateId(params.option.ownerId)

        const product = await ProductModel.findOneAndUpdate({
            _id: params.option.ownerId,
            variants: { $elemMatch: { id: params.option.variantId } },
        }, {
            $pull: { 'variants.$.options': params.option.id },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async getDocumentsCount(params: any = {}) {
        return ProductModel.countDocuments(params)
    }
}

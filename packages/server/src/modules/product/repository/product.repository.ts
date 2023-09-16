import mongoose, { Document } from 'mongoose'
import { id, inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '../types/repository'
import { IAttribute, IProduct, IProductMongoModel, IProductQuery, IRequestParams, IVariant } from '@proshop/types'
import { ILogger } from '@/types/utils'
import { RepositoryHelpers } from '@modules/product/helpers/repository.helpers'

import { ProductMapper } from '@modules/product/mappers/product.mapper'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'

@injectable()
export class ProductRepository extends RepositoryHelpers implements IProductRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
        super()
    }

    async create(product: IProduct) {
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

        await Promise.all([
            ProductModel.populate(products, this.getRelatedPopulateParams()),
            ProductModel.populate(products, this.getCurrencyPopulateParams()),
        ])

        return products.map(product => ProductMapper.toDomain(product))
    }

    async update($set: Partial<IProduct>) {
        validateId($set.id)

        const updated = await ProductModel.findByIdAndUpdate(
            { _id: $set.id },
            { $set: ProductMapper.toMongoModelData($set) },
            { new: true },
        )
            .lean()
            .populate(this.getPopulateParams()) as IProductMongoModel

        return { updated: ProductMapper.toDomain(updated) }
    }

    async delete(id: string) {
        validateId(id)

        return !!await ProductModel.findOneAndDelete({ _id: id })
    }

    async addAttribute(params: { productId: string, attribute: IAttribute }) {
        validateId(params.productId)

        const product = await ProductModel.findOneAndUpdate({ _id: params.productId }, {
            $push: { attributes: params.attribute },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async deleteAttribute(params: { productId: string, attributeId: string }) {
        validateId(params.productId)

        const product = await ProductModel.findOneAndUpdate({ _id: params.productId }, {
            $pull: { attributes: { id: params.attributeId } },
        }, { new: true })
            .populate(this.getPopulateParams())
            .lean() as IProductMongoModel

        return ProductMapper.toDomain(product)
    }

    async getDocumentsCount(params: any = {}) {
        return ProductModel.countDocuments(params)
    }
}

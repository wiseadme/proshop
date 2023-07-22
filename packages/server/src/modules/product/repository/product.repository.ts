import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '../types/repository'
import { IProduct, IProductQuery, IRequestParams } from '@proshop/types'
import { ILogger } from '@/types/utils'
import { RepositoryHelpers } from '@modules/product/helpers/repository.helpers'

// Constants
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '@common/constants/counts'

@injectable()
export class ProductRepository extends RepositoryHelpers implements IProductRepository {
    constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
        super()
    }

    async create(product: IProduct) {
        return await (await new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            name: product.name,
            price: product.price,
            currency: product.currency,
            description: product.description,
            image: product.image,
            url: product.url,
            count: product.quantity,
            categories: product.categories,
            variants: product.variants,
            attributes: product.attributes,
            unit: product.unit,
            assets: product.assets,
            seo: product.seo,
            conditions: product.conditions,
            related: product.related,
        })
            .save())
            .populate(this.getPopulateParams()) as IProduct
    }

    async read({
        _id,
        name,
        category,
        url,
        desc,
        asc,
        key,
        page = DEFAULT_PAGE,
        count = DEFAULT_ITEMS_COUNT,
    }: IRequestParams<IProductQuery>) {

        let products

        const queryParams = {
            ...this.getPaginationParams({ page, count }),
            ...this.getSortParams({ desc, asc, key }),
        }

        if (_id) {
            validateId(_id)

            return ProductModel.find({ _id }).lean().populate(this.getPopulateParams())
        }

        if (category) {
            products = await ProductModel.aggregate(this.prepareAggregateParams({
                count,
                page,
                category,
                desc,
                asc,
                key,
            })).exec()

            await Promise.all([
                ProductModel.populate(products, this.getRelatedPopulateParams()),
                ProductModel.populate(products, this.getCurrencyPopulateParams()),
            ])
        }

        if (url) {
            products = ProductModel.find({ url }, [], queryParams).lean().populate(this.getPopulateParams())
        }

        if (name) {
            products = ProductModel.find({
                'name': {
                    '$regex': `.*${name}*.`,
                    '$options': 'i',
                },
            }, queryParams).lean().populate(this.getPopulateParams())
        }

        if (!products) {
            products = ProductModel
                .find({}, [], queryParams)
                .lean()
                .populate(this.getPopulateParams())
        }

        return products
    }

    async update($set: Partial<IProduct>) {
        validateId($set._id)

        const updated = await ProductModel.findByIdAndUpdate(
            { _id: $set._id },
            { $set },
            { new: true },
        )
            .lean()
            .populate(this.getPopulateParams()) as Document & IProduct

        return { updated }
    }

    async delete(id) {
        validateId(id)

        return !!await ProductModel.findOneAndDelete({ _id: id }).lean()
    }

    async getDocumentsCount(params: any = {}) {
        return ProductModel.countDocuments(params)
    }
}

import { injectable } from 'inversify'
import { IProductMongoRepositoryHelpers } from '@modules/products/types/repository'

@injectable()
export class MongoRepositoryHelpers implements IProductMongoRepositoryHelpers {
    getPaginationParams({ page, count }) {
        return {
            skip: (Number(page) * Number(count)) - Number(count),
            limit: Number(count),
        }
    }

    getSortParams({ desc, asc, key, aggregate = false }) {
        const isDesc = desc === 'true'
        const isAsc = asc === 'true'

        const sortKey = aggregate ? '$sort' : 'sort'

        return isDesc || isAsc ? {
            [sortKey]: { [key as string]: (isDesc && -1) || (isAsc && 1) },
        } : {}
    }

    getAssetsPopulateParams() {
        return {
            path: 'assets',
            options: {
                lean: true
            }
        }
    }

    getCategoriesPopulateParams() {
        return {
            path: 'categories',
            select: 'title url order _id parentId',
            options: {
                lean: true
            }
        }
    }

    getVariantsPopulateParams() {
        return {
            path: 'groups',
            populate: {
                path: 'variant',
            },
            options: {
                lean: true
            }
        }
    }

    getRelatedPopulateParams() {
        return {
            path: 'related',
            select: 'name price url image categories currency conditions sku',
            populate: [this.getCategoriesPopulateParams()],
            options: {
                lean: true
            }
        }
    }

    getProductPopulateParams() {
        return [
            this.getAssetsPopulateParams(),
            this.getCategoriesPopulateParams(),
            this.getVariantsPopulateParams(),
            this.getRelatedPopulateParams(),
        ]
    }

    prepareAggregateParams({ category, count, page, desc, asc, key }) {
        const isNeedToBeSorted = desc === 'true' || asc === 'true'

        const aggregateParams = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories',
                },
            },
            // {
            //   $unwind: '$categories'
            // },
            { '$match': { 'categories.url': category } },
            { '$skip': this.getPaginationParams({ page, count }).skip },
            { '$limit': Number(count) },
        ] as any

        if (isNeedToBeSorted) {
            aggregateParams.push(this.getSortParams({ desc, asc, key, aggregate: true }))
        }

        return aggregateParams
    }
}

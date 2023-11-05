import { IProduct, Maybe } from '@proshop/types'

export class RepositoryHelpers {
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
            path: 'variants',
            populate: {
                path: 'options',
                select: '_id name product ownerId variantId quantity order price description',
                options: {
                    lean: true,
                },
                populate: {
                    path: 'product',
                    select: 'name url price quantity image',
                    options: {
                        lean: true
                    }
                }
            },
        }
    }

    getCurrencyPopulateParams() {
        return {
            path: 'currency',
            select: 'currency',
            transform: (doc) => doc?.currency,
        }
    }

    getRelatedPopulateParams() {
        return {
            path: 'related',
            select: 'name price url image categories currency',
            populate: [
                this.getCategoriesPopulateParams(),
                this.getCurrencyPopulateParams(),
            ],
            options: {
                lean: true
            }
        }
    }

    getPopulateParams() {
        return [
            this.getAssetsPopulateParams(),
            this.getCategoriesPopulateParams(),
            this.getVariantsPopulateParams(),
            this.getRelatedPopulateParams(),
            this.getCurrencyPopulateParams(),
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

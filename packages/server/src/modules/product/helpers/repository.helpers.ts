export class RepositoryHelpers {
  preparePaginationParams({ page, count }) {
    return {
      skip: (Number(page) * Number(count)) - Number(count),
      limit: Number(count),
    }
  }

  prepareSortParams({ desc, asc, key, aggregate = false }) {
    const isDesc = desc === 'true'
    const isAsc = asc === 'true'

    const sortKey = aggregate ? '$sort' : 'sort'

    return isDesc || isAsc ? {
      [sortKey]: { [key as string]: (isDesc && -1) || (isAsc && 1) }
    } : {}
  }

  preparePopulateParams() {
    return [
      'assets',
      {
        path: 'categories',
        select: 'title url order'
      },
      {
        path: 'variants',
        populate: {
          path: 'options',
          populate: {
            path: 'assets'
          }
        }
      },
      {
        path: 'related',
        select: 'name price url image'
      }
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
          as: 'categories'
        }
      },
      // {
      //   $unwind: '$categories'
      // },
      { '$match': { 'categories.url': category } },
      { '$skip': this.preparePaginationParams({ page, count }).skip },
      { '$limit': Number(count) },
    ] as any

    if (isNeedToBeSorted) {
      aggregateParams.push(this.prepareSortParams({ desc, asc, key, aggregate: true }))
    }

    return aggregateParams
  }
}

export class RepositoryHelpers {
  preparePaginationParams({ page, count }){
    return {
      skip: (page * count) - count,
      limit: count,
    }
  }

  prepareSortParams({ desc, asc, key, isForAggregate = false }){
    const isDesc = desc === 'true'
    const isAsc = asc === 'true'

    const sortKey = isForAggregate ? '$sort' : 'sort'

    return isDesc || isAsc ? {
      [sortKey]: { [key as string]: (isDesc && -1) || (isAsc && 1) }
    } : {}
  }

  preparePopulateParams(){
    return [
      'assets',
      {
        path: 'categories',
        select: 'title'
      },
      {
        path: 'variants',
        populate: {
          path: 'options',
          populate: {
            path: 'assets'
          }
        }
      }
    ]
  }

  prepareAggregateParams({ category, count, page, desc, asc, key }){
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
      {
        $unwind: '$category'
      },
      { '$match': { 'categories.url': category } },
      { '$skip': this.preparePaginationParams({ page, count }).skip },
      { '$limit': count },
    ] as any

    if (isNeedToBeSorted) {
      aggregateParams.push(this.prepareSortParams({ desc, asc, key, isForAggregate: true }))
    }

    return aggregateParams
  }
}

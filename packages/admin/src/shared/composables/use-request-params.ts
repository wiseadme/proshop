import { unref } from 'vue'

import { usePagination } from '@shared/composables/use-pagination'
import { useSort } from '@shared/composables/use-sort'

import {
    IProductQuery,
    IRequestPagination,
    IRequestParams,
    IRequestSort,
} from '@proshop/types'

export const useRequestParams = () => {
    const pagination = usePagination()
    const sort = useSort()

    const { page, count } = pagination

    const getRequestParams = (params: Maybe<IProductQuery> = null): IRequestParams<IProductQuery> => {
        return {
            ...(params || {}),
            ...getPaginationParams(),
            ...getSortParams(),
        }
    }

    const getPaginationParams = (): IRequestPagination => {
        return {
            page: unref(page),
            count: unref(count),
            length: true,
        }
    }

    const getSortParams = (): IRequestSort | object => {
        return unref(sort.isNeedToBeSorted) ? {
            asc: unref(sort.asc),
            desc: unref(sort.desc),
            key: unref(sort.sortKey),
        } : {}
    }

    return {
        sort,
        pagination,
        getRequestParams,
        getPaginationParams,
        getSortParams,
    }
}

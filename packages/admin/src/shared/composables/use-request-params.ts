import { usePagination } from '@shared/composables/use-pagination'
import { useSort } from '@shared/composables/use-sort'
import {
    IProductQuery,
    IRequestPagination,
    IRequestParams,
    IRequestSort
} from '@proshop/types'
import { unref } from 'vue'

export const useRequestParams = () => {
    const pagination = usePagination()
    const sort = useSort()

    const makeRequestParams = (params: Maybe<IProductQuery> = null): IRequestParams<IProductQuery> => {
        return {
            ...(params ? params : {}),
            ...getPaginationParams(),
            ...getSortParams(),
        }
    }

    const getPaginationParams = (): IRequestPagination => {
        return {
            page: unref(pagination.page),
            count: unref(pagination.count),
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
        makeRequestParams,
        getPaginationParams,
        getSortParams
    }
}

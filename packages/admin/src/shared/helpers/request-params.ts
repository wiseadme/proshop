import { unref } from 'vue'

import { usePagination } from '@shared/composables/use-pagination'
import { useSort } from '@shared/composables/use-sort'

import {
    IProductQuery,
    IRequestPagination,
    IRequestParams,
    IRequestSort
} from '@proshop/types'

export class RequestParams {
    sort: ReturnType<typeof useSort>
    pagination: ReturnType<typeof usePagination>

    constructor({ sort = useSort(), pagination = usePagination() } = {}) {
        this.pagination = pagination
        this.sort = sort
    }

    makeRequestParams(params: Maybe<IProductQuery> = null): IRequestParams<IProductQuery> {
        return {
            ...(params ? params : {}),
            ...this.getPaginationParams(),
            ...this.getSortParams(),
        }
    }

    getPaginationParams(): IRequestPagination {
        return {
            page: unref(this.pagination.page),
            count: unref(this.pagination.count),
            length: true,
        }
    }

    getSortParams(): IRequestSort | object {
        return this.sort.isNeedToBeSorted.value ? {
            asc: unref(this.sort.asc),
            desc: unref(this.sort.desc),
            key: unref(this.sort.sortKey),
        } : {}
    }
}

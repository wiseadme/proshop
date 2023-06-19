export interface IRequestPagination {
    page?: number
    count?: number
    length?: boolean
}

export interface IRequestSort {
    desc?: boolean,
    asc?: boolean,
    key?: string
}

export interface IRequestCategory {
    category?: string
}

export type IRequestParams<T> = T & IRequestPagination & IRequestSort & IRequestCategory

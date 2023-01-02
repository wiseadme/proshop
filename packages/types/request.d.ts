export interface IRequestPagination {
  page: number
  count: number
  length?: boolean
}

export interface IRequestSort {
  desc?: boolean,
  asc?: boolean,
  key: string
}

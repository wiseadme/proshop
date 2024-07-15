import { IProduct } from '@proshop-app/types'

export interface IResponseItems {
    items: IProduct[]
    count: number
}

export class ServiceHelpers {
    constructor() {
    }

    getCategoriesMap(categories: string[]) {
        return categories.reduce((acc, categoryId) => {
            acc[categoryId] = true

            return acc
        }, {})
    }

    formatToResponse(items: IProduct[], count = 0): IResponseItems {
        return {
            items,
            count
        }
    }
}

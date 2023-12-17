import { IProduct } from '@proshop/types'

export class ServiceHelpers {
    constructor() {
    }

    getCategoriesMap(categories) {
        return categories.reduce((acc, categoryId) => {
            acc[categoryId] = true

            return acc
        }, {})
    }

    getResponseFormat(items: IProduct[], count = 0) {
        return {
            items,
            count
        }
    }
}

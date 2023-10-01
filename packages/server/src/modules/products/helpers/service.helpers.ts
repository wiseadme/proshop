export class ServiceHelpers {
    constructor() {
    }

    getCategoriesMap(categories) {
        return categories.reduce((acc, categoryId) => {
            acc[categoryId] = true

            return acc
        }, {})
    }
}

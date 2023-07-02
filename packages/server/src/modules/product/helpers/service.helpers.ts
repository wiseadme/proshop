export class ServiceHelpers {
    private _repository
    private _gateway

    constructor() {
    }

    getCategoriesMap(categories) {
        return categories.reduce((acc, ctg) => {
            acc[ctg._id] = ctg

            return acc
        }, {})
    }
}

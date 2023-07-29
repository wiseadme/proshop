import { ProductConditions } from '@shared/enums/product-conditions'
import { stringToSnakeUpperCase } from '@shared/helpers'

export const getProductConditionTitle = (condition) => {
    return ProductConditions[stringToSnakeUpperCase(condition)]
}

export const getCategoriesIds = (product) => {
    return product.categories.map(ctg => ctg.id)
}

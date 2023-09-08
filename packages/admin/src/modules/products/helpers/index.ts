import { ProductConditions } from '@shared/enums/product-conditions'
import { stringToSnakeUpperCase } from '@shared/helpers'

export const getProductConditionTitle = (condition) => {
    return ProductConditions[stringToSnakeUpperCase(condition)]
}

export const getIds = (itemsArray: any[]): string[] => {
    return itemsArray.map(item => item.id)
}

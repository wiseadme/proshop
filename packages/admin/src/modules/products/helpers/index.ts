import { ProductConditions } from '@shared/enums/product-conditions'
import { camelToSnakeCase } from '@shared/helpers'

export const getProductConditionTitle = (condition) => {
    return ProductConditions[camelToSnakeCase(condition).toUpperCase()]
}

export const getIds = (itemsArray: any[]): string[] => {
    return itemsArray.map(item => item.id)
}

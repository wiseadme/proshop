import { ProductConditions } from '@shared/enums/product-conditions'
import { stringToSnakeUpperCase } from '@shared/helpers'

export const getProductConditionTitle = (condition) => {
  return ProductConditions[stringToSnakeUpperCase(condition)]
}

import { toJSON } from '@shared/helpers/index'

/**
 * @description - Сравнивает два объекта на равенство в виде строки
 * с помощью JSON.stringify
 */
export const hasValueDiffs = ({
    model,
    entity
}) => toJSON(model) !== toJSON(entity)

/**
 * @description - Сравнивает два значения на равенство
 */
export const hasDiffs = ({
    model,
    entity
}) => model !== entity

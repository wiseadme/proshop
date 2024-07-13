/**
 * @description - конвертация объекта в json строку
 * @param {Object | Array} origin массив или объект для конвертирования
 */
export const toJSON = (origin: object | any[]) => JSON.stringify(origin).trim()
/**
 * @description - копирует объект без связи с data объектом
 * @param {Object | Array} origin массив или объект для клонирования
 */
export const clone = (origin: object | any[]) => JSON.parse(toJSON(origin))

export const getDifferences = (changed, origin) => {
    if (!origin) return null

    const diffs = {}

    for (const key in changed) {
        if (changed[key] && Object.hasOwn(changed, key)) {
            if (toJSON(changed[key]) !== toJSON(origin[key])) {
                diffs[key] = changed[key]
            }
        }
    }

    return Object.keys(diffs).length ? diffs : null
}

/**
 * @description - конвертирует camelCase в snake_case в верхнем регистре
 * @param {String} value - строка вида camelCase
 * @returns {String} - строка вида CAMEL_CASE
 */
export const camelToSnakeCase = (value: string): string => value.replace(/([a-z]+)([A-Z])/g, '$1_$2').toUpperCase()

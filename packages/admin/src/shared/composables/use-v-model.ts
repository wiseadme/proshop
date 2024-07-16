import { computed, getCurrentInstance } from 'vue'

export const useVModel = (props, key, valueKey = '') => {
    const instance = getCurrentInstance()!

    return computed({
        get: () => props[key],
        set: (val) => {
            instance.emit(`update:${key}`, valueKey ? val[valueKey] : val)
        }
    })
}

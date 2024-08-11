import { computed, getCurrentInstance } from 'vue'

export const useVModel = (key: string = 'modelValue', valueKey = '') => {
    const instance = getCurrentInstance()!

    return computed({
        get: () => instance.props[key],
        set: (val: any) => {
            instance.emit(`update:${key}`, valueKey ? val[valueKey] : val)
        }
    })
}

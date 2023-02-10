import { computed } from 'vue'

export const useVModel = (props, key, emit, valueKey = '') => {
  return computed({
    get: () => props[key],
    set: (val) => {
      emit(`update:${ key }`, valueKey ? val[valueKey] : val)
    }
  })
}

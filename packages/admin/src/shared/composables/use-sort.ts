import {
    computed,
    ref,
    unref
} from 'vue'

export const useSort = () => {
    const desc = ref(false)
    const asc = ref(false)
    const sortKey = ref('')

    const isNeedToBeSorted = computed<boolean>(() => unref(desc) || unref(asc))

    const setDesc = (key: string) => {
        desc.value = true
        asc.value = false
        sortKey.value = key
    }

    const setAsc = (key: string) => {
        desc.value = false
        asc.value = true
        sortKey.value = key
    }

    return {
        desc,
        asc,
        sortKey,
        isNeedToBeSorted,
        setAsc,
        setDesc
    }
}

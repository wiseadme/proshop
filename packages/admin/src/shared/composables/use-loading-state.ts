import { ref } from 'vue'

export const useLoadingState = () => {
    const loading = ref(false)

    const setLoadingState = (value: boolean) => {
        loading.value = value
    }

    return {
        loading,
        setLoadingState
    }
}

import { ref } from 'vue'

export const useLoadingState = () => {
    const loading = ref(false)

    const setLoadingState = (value) => {
        loading.value = value
    }

    return {
        loading,
        setLoadingState
    }
}

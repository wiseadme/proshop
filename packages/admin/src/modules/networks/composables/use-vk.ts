import { useVKStore } from '@modules/networks/store/vk'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export const useVK = () => {
    const _store = useVKStore()
    const route = useRoute()

    const authUrl = import.meta.env.VITE_VK_AUTH_URI
    const secretKey = import.meta.env.VITE_VK_SECRET_KEY
    const clientId = import.meta.env.VITE_VK_CLIENT_ID
    const redirectUri = import.meta.env.VITE_VK_REDIRECT_URI
    const display = import.meta.env.VITE_VK_DISPLAY

    const clientCode = computed(() => route.query.code)

    const getVKEnterURL = () => {
        const searchParams = new URLSearchParams()

        searchParams.append('client_id', clientId!)
        searchParams.append('redirect_uri', redirectUri!)
        searchParams.append('display', display!)

        return `${authUrl}?${searchParams.toString()}`
    }

    const getAccessToken = () => {
        return _store.getVKAccessToken({
            client_id: clientId,
            redirect_uri: redirectUri,
            client_secret: secretKey,
            code: route.query.code,
        })
    }

    return {
        clientCode,
        getVKEnterURL,
        getAccessToken,
    }
}

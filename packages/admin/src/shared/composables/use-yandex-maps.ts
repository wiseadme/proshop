let isYandexInstalled = false

export const useYandexMaps = () => {

    const addYmapsScript = () => {
        if (isYandexInstalled) {
            return
        }

        const url = new URL('https://api-maps.yandex.ru/2.1/')
        const searchParams = new URLSearchParams()

        searchParams.append('apikey', '')
        searchParams.append('lang', 'ru_RU')

        const scriptYandex = document.createElement('script')

        scriptYandex.setAttribute('src', url.toString() + '?' + searchParams.toString())
        scriptYandex.setAttribute('type', 'text/javascript')

        document.head.appendChild(scriptYandex)

        isYandexInstalled = true
    }

    return {
        addYmapsScript
    }
}

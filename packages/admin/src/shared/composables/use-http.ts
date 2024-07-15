interface IInterceptor {
    (options: RequestInit & { params?: any }, cancel: () => void): Promise<any>
}

interface IInterceptorHooks {
    beforeRequest: {
        use: (fn: IInterceptor) => void;
    }
}

export const useHttp = () => {
    const beforeRequest: IInterceptor[] = []

    const hooks: IInterceptorHooks = {
        beforeRequest: {
            use: (fn) => beforeRequest.push(fn)
        }
    }

    const controller = new AbortController()

    const cancel = () => controller.abort()

    const request = async (path: string, options: RequestInit & { params?: any } = {}) => {
        try {
            const normalizedOptions: Record<string, any> = {
                method: options.method ?? 'GET',
                credentials: options.credentials ?? 'same-origin',
                redirect: options.redirect ?? 'manual',
                signal: controller.signal,
                headers: options.headers ?? {},
            }

            if (options.method === 'POST') {
                normalizedOptions.body = options.body
            }

            if (beforeRequest.length) {
                for await (const fn of beforeRequest) {
                    await fn({ ...normalizedOptions, params: options.params ?? {} }, cancel)
                }
            }

            const queryParams = options.params ? new URLSearchParams(options.params).toString() : ''

            const response = await fetch(path + queryParams, normalizedOptions)

            if (response.ok) {
                return await response.json()
            }

            return Promise.reject({
                status: response.status,
                message: response.statusText
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }


    return {
        hooks,
        request,
        cancel
    }
}

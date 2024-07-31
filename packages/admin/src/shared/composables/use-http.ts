import { createSharedComposable } from '@shared/composables/features/create-shared-composable'

interface IRequestOptions extends RequestInit {
    url: string
    body?: any
    data?: any
    params?: Record<string, any>
}

export interface IRequestContext extends IRequestOptions {
    cancel: (reason?: string) => void
}

interface IInterceptor {
    (context: IRequestContext): Promise<any>
}

interface IInterceptorHooks {
    beforeRequest: {
        use: (fn: IInterceptor) => void;
    }
}

export interface IHttpModule {
    request(options?: IRequestOptions): Promise<any>

    hooks: IInterceptorHooks

    cancel(): void
}

export const useHttp = (): IHttpModule => {
    const beforeRequest: IInterceptor[] = []

    const hooks: IInterceptorHooks = {
        beforeRequest: {
            use: (fn) => beforeRequest.push(fn)
        }
    }

    const controller = new AbortController()

    const cancel = (reason?: string) => controller.abort(reason ?? '')

    const request = async (options: IRequestOptions) => {
        try {
            const normalizedOptions: IRequestOptions = {
                method: options.method ?? 'GET',
                credentials: options.credentials ?? 'same-origin',
                redirect: options.redirect ?? 'manual',
                signal: controller.signal,
                headers: options.headers ?? {},
                cache: options.cache ?? 'no-cache',
                url: options.url,
            }

            if (options.body) {
                normalizedOptions.body = JSON.stringify(options.body)
            }

            if (options.data) {
                normalizedOptions.body = options.data
            }

            if (beforeRequest.length) {
                for await (const fn of beforeRequest) {
                    await fn({ ...normalizedOptions, params: options.params ?? {}, cancel })
                }
            }

            const queryParams = options.params ? `?${new URLSearchParams(options.params).toString()}` : ''

            const response = await fetch(normalizedOptions.url + queryParams, normalizedOptions)

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

export const useSharedHttp = createSharedComposable(useHttp)

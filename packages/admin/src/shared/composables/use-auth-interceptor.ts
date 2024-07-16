import { unref } from 'vue'

import { useAuthService } from '@shared/composables/use-auth-service'
import { IHttpModule, IRequestContext } from '@shared/composables/use-http'

export const useAuthInterceptor = (http: IHttpModule) => {
    let promise: Maybe<Promise<any>> = null

    http.hooks.beforeRequest.use(async (context: IRequestContext) => {
        const { user, refresh, logout } = useAuthService()

        if (!unref(user) || unref(user)!.exp! * 1000 <= Date.now()) {
            promise ??= refresh().catch(logout)

            await promise
                .then(() => promise = null)
                .catch(() => context.cancel('Not authenticated request'))
        }
    })
}

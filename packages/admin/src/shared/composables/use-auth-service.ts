import { computed, unref } from 'vue'

import type { ILoginData } from '@shared/composables/repository/use-auth-repository'

import { useLogger } from '@shared/utils/logger'

import type { IUser, Maybe } from '@proshop-app/types'

import { router } from '@app/router'
import { RouteNames } from '@shared/enums/route-names'
import { useAuthStore } from '@shared/store/auth'

export const useAuthService = () => {
    const _store = useAuthStore()
    const { logError } = useLogger()

    const {
        whoAmI,
        refresh,
        loginUser,
        logoutUser,
    } = _store

    const user = computed(() => _store.user as Maybe<IUser>)
    const isAuthenticated = computed(() => _store.isAuthenticated)
    const isChecked = computed(() => _store.isChecked)
    const route = computed(() => unref(router.currentRoute))

    const login = async (user: ILoginData) => {
        try {
            await loginUser(user)

            return router.push({ name: RouteNames.DASHBOARD })
        } catch (err) {
            logError('Authentication error', err)
        }
    }

    const logout = async () => {
        try {
            await logoutUser()

            return router.push({ name: RouteNames.LOGIN })
        } catch (err) {
            logError('Logout error', err)
        }
    }

    const check = async () => {
        try {
            await whoAmI()

            if (unref(route).path.includes(RouteNames.AUTH)) {
                return router.replace({ name: RouteNames.DASHBOARD })
            }
        } catch (err) {
            logError('Identification failed', err)

            return logout()
        }
    }

    return {
        user,
        isAuthenticated,
        isChecked,
        refresh,
        login,
        logout,
        check,
    }
}

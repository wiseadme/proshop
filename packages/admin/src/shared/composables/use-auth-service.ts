import { computed } from 'vue'
import { useAuthStore } from '@shared/store/auth'
import { IUser, Maybe } from '@proshop/types'
import { router } from '@app/router'
import { RouteNames } from '@shared/constants/route-names'

export const useAuthService = () => {
    const _store = useAuthStore()

    const {
        whoAmI,
        refresh,
        loginUser,
        logoutUser,
    } = _store

    const user = computed(() => _store.user as Maybe<IUser>)
    const isAuthenticated = computed(() => _store.isAuthenticated)
    const isChecked = computed(() => _store.isChecked)

    const login = async (user: {
        username: string,
        password: string
    }) => loginUser(user).then(() => router.push({ name: RouteNames.MAIN }))
    const logout = async () => logoutUser().then(() => router.push({ name: RouteNames.LOGIN }))
    const check = async () => whoAmI()
        .then(() => {
            if (router.currentRoute.value.path.includes(RouteNames.AUTH)) {
                router.replace({ name: RouteNames.DASHBOARD })
            }
        })
        .catch(logout)

    return {
        user,
        isAuthenticated,
        isChecked,
        login,
        refresh,
        logout,
        check,
    }
}

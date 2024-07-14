import { computed } from "vue"

import { IUser } from '@proshop/types'

import { useUserStore } from "@modules/users/store"

export const useUsersService = () => {
    const _store = useUserStore()

    const users = computed(() => _store.users)

    const createUser = (user: IUser) => {
        return _store.createUser(user)
    }

    const fetchUsers = (params = {}) => {
        return _store.fetchUsers(params)
    }

    const deleteUser = (user: IUser) => {
        return _store.deleteUser(user.id)
    }

    return {
        users,
        createUser,
        fetchUsers,
        deleteUser
    }
}

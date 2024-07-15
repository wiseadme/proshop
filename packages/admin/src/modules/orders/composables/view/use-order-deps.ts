import { computed } from 'vue'

import { useUserStore } from '@modules/users/store'

export const useOrderDeps = () => {
    const usersStore = useUserStore()
    const { fetchUsers } = usersStore

    const users = computed(() => usersStore.users ?? [])

    return {
        users,
        fetchUsers
    }
}

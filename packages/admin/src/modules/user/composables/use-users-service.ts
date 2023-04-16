import { useUserStore } from "@modules/user/store"
import { computed } from "vue"

export const useUsersService = () => {
  const _store = useUserStore()

  const users = computed(() => _store.users)

  const createUser = (user) => {
    return _store.createUser(user)
  }

  const fetchUsers = (params = {}) => {
    return _store.fetchUsers(params)
  }

  const deleteUser = (user) => {
    return _store.deleteUser(user._id)
  }

  return {
    users,
    createUser,
    fetchUsers,
    deleteUser
  }
}

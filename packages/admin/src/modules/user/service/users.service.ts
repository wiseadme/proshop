import { useUserStore } from '@modules/user/store'

class Service {
  private _store: ReturnType<typeof useUserStore>

  constructor({ store }) {
    this._store = store
  }

  get users() {
    return this._store.users
  }

  createUser(user) {
    return this._store.createUser(user)
  }

  fetchUsers(params = {}) {
    return this._store.fetchUsers(params)
  }

  deleteUser(user) {
    return this._store.deleteUser(user._id)
  }
}

export const useUserService = () => new Service({
  store: useUserStore()
})

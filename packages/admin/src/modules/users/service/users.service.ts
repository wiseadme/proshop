import { useUsersStore } from '@modules/users/store'

class Service {
  private _store: ReturnType<typeof useUsersStore>

  constructor({ store }) {
    this._store = store
  }

  get users() {
    return this._store.users
  }

  fetchUsers(params = {}) {
    return this._store.fetchUsers(params)
  }
}

export const useUsersService = () => new Service({
  store: useUsersStore()
})

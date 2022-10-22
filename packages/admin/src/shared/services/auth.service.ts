import { useAuthStore } from '@shared/store/auth'

export class Service {
  private _store: ReturnType<typeof useAuthStore>

  constructor({ store }){
    this._store = store
  }

  async login(user){
    console.log(this._store)
    this._store.loginUser(user)
  }
}

export const useAuthService = () => new Service({
  store: useAuthStore()
})

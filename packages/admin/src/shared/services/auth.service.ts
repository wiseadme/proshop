import { useAuthStore } from '@shared/store/auth'
import { storage } from '@shared/utils/storage'
import { router } from '@app/router'
import { storageKeys } from '@shared/constants/storage-keys'

export class Service {
  private _store: ReturnType<typeof useAuthStore>

  constructor({ store }){
    this._store = store
  }

  get accessToken() {
    return this._store.user?.access_token
  }

  async login(userParams){
    const user = await this._store.loginUser(userParams)
    storage.set(storageKeys.USER, user).then(() => router.push('/'))
  }

  logout(){
    storage.remove(storageKeys.USER)
      .then(() => {
        this._store.setUser(null)
        router.push({ name: 'auth' })
      })
  }

  async setUserFromStorage(){
    return storage.get(storageKeys.USER)
      .then(user => this._store.setUser(user))
  }
}

export const useAuthService = () => new Service({
  store: useAuthStore()
})

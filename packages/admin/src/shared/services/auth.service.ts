import { useAuthStore } from '@shared/store/auth'
import { router } from '@app/router'
// import { storage } from '@shared/utils/storage'
// import { storageKeys } from '@shared/constants/storage-keys'

export class Service {
  private _store: ReturnType<typeof useAuthStore>

  constructor({ store }){
    this._store = store
  }

  get user(){
    return this._store.user
  }

  get isAuthenticated(){
    return this._store.isAuthenticated
  }

  get isChecked(){
    return this._store.isChecked
  }

  async login(user){
    await this._store.loginUser(user)

    return router.push('/')
  }

  async create(user){
    return this._store.createUser(user)
  }

  async check(){
    return this._store.whoAmI()
  }

  logout(){
    this._store.$patch({ isAuthenticated: false })
    router.push({ name: 'auth' })
  }
}

export const useAuthService = () => new Service({
  store: useAuthStore()
})

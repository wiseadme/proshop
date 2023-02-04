import { useAuthStore } from '@shared/store/auth'
import { router } from '@app/router'
import { Router } from 'vue-router'

export class Service {
  private _store: ReturnType<typeof useAuthStore>
  private _router: Router

  constructor({ store, router }){
    this._store = store
    this._router = router
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

    return this._router.push('/')
  }

  async create(user){
    return this._store.createUser(user)
  }

  async refresh(){
    return this._store.refresh()
  }

  async check(){
    try {
      await this._store.whoAmI()

      if (this._router.currentRoute.value.path.includes('/auth')) {
        return this._router.replace({ name: 'dashboard-table' })
      }
    } catch (err) {
      return this.logout()
    }
  }

  async logout(){
    await this._store.logout()

    return this._router.push({ name: 'login' })
  }
}

export const useAuthService = () => new Service({
  store: useAuthStore(),
  router: router
})

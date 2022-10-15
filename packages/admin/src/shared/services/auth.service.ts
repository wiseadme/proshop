import { Store } from 'nervue'

export class Service {
  private _store: Store

  constructor({ store }){
    this._store = store
  }

  async login(user){
    this._store.loginUser(user)
  }
}

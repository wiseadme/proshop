import { Store } from 'nervue'
import { useAttributeStore } from '@modules/attributes/store'
import { IAttributeActions, IAttributeState } from '@modules/attributes/types'

export class Service {
  private _store: Store<string, IAttributeState, {}, {}, IAttributeActions>

  constructor({ store }){
    this._store = store
  }

  get attributes(){
    return this._store.attributes
  }

  updateAttribute(updates){
    return this._store.update(updates)
      .then(res => console.log(res))
  }

  createAttribute(attribute){
    return this._store.create(attribute)
  }

  deleteAttribute(id){
    return this._store.delete(id).then(() => this.getAttributes())
  }

  getAttributes(){
    return this._store.read().catch(err => console.log(err))
  }
}

export const useAttributeService = () => new Service({
  store: useAttributeStore()
})

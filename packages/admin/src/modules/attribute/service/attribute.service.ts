import { Store } from 'nervue'
import { useAttributeStore } from '@modules/attribute/store'
import { IAttributeActions, IAttributeState } from '@modules/attribute/types'

export class Service {
  static instance: Service
  private _store: Store<string, IAttributeState, {}, {}, IAttributeActions>

  constructor(store){
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

  static create(){
    if (Service.instance) return Service.instance
    Service.instance = new Service(useAttributeStore())
    return Service.instance
  }
}

export const useAttributeService = () => Service.create()
import { Store } from 'pinia'
import { useAttributeStore } from '@modules/attribute/store'
import { useAppStore } from '@app/store'

export class Service {
  static instance: Service
  private _store: Store<string, IAttributeState, {}, IAttributesActions>
  private _appStore: Store<string, any, {}, any>

  constructor(store, appStore) {
    this._store = store
    this._appStore = appStore
  }

  get attributes() {
    return this._appStore.attributes
  }

  updateAttribute(updates) {
    return this._store.update(updates)
      .then(res => console.log(res))
  }

  createAttribute(attribute) {
    return this._store.create(attribute)
  }

  deleteAttribute(id) {
    return this._store.delete(id).then(() => this.getAttributes())
  }

  getAttributes() {
    return this._appStore.getAttributes().catch(err => console.log(err))
  }

  static create() {
    if (Service.instance) return Service.instance
    Service.instance = new Service(useAttributeStore(), useAppStore())
    return Service.instance
  }
}

export const useAttributeService = () => Service.create()

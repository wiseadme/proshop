import { Store } from 'pinia'
import { useVariantStore } from '@modules/variant/store'
import { useAppStore } from '@app/store'

class Service {
  private _store: Store<string, IVariantState, {}, IVariantActions>
  private _appStore: Store<string, any, {}, any>
  static instance: Service

  constructor(store, appStore) {
    this._store = store
    this._appStore = appStore
  }

  get variants() {
    return this._appStore.variants
  }

  createVariant(variant: IVariant) {
    return this._store.create(variant)
  }

  deleteVariant(id) {
    return this._store.delete(id)
  }

  getVariants(id = '') {
    return this._appStore.getVariants(id)
  }

  onGetVariants() {
    if (this._store.variants) return this._store.variants
    return this.getVariants()
  }

  static create() {
    if (Service.instance) return Service.instance
    Service.instance = new Service(useVariantStore(), useAppStore())
    return Service.instance
  }
}

export const useVariantService = () => Service.create()

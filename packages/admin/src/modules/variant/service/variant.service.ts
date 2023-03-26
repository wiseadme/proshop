import { Store } from 'nervue'
import { useVariantsStore } from '@modules/variant/store'
import { IVariant } from '@ecommerce-platform/types'
import { IVariantState, IVariantActions } from '@modules/variant/types'

class Service {
  private _store: Store<string, IVariantState, {}, {}, IVariantActions>

  constructor({ store }){
    this._store = store
  }

  get variants(){
    return this._store.variants
  }

  createVariant(variant: IVariant){
    return this._store.create(variant)
  }

  deleteVariant(id){
    return this._store.delete(id)
  }

  getVariants(id = ''){
    return this._store.read(id)
  }

  onGetVariants(){
    if (this._store.variants) {
      return this._store.variants
    }

    return this.getVariants()
  }
}

export const useVariantService = () => new Service({
  store: useVariantsStore()
})

import { Store } from 'nervue'
import { useVariantStore } from '@modules/variant/store'
import {IVariantState, IVariantActions, IVariant} from '@modules/variant/types'

class Service {
  private _store: Store<string, IVariantState, {}, {}, IVariantActions>
  static instance: Service

  constructor(store){
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
    if (this._store.variants) return this._store.variants
    return this.getVariants()
  }

  static create(){
    if (Service.instance) return Service.instance
    Service.instance = new Service(useVariantStore())
    return Service.instance
  }
}

export const useVariantService = () => Service.create()

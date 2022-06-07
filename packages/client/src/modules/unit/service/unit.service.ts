import { Store } from 'pinia'
import { useUnitStore } from '@modules/unit/store'
import { useCategoryStore } from '@modules/category/store'

class Service {
  private _store: Store<string, IUnitState, {}, IUnitActions>
  static instance: Service

  constructor(store){
    this._store = store
  }

  get units(){
    return this._store.units
  }

  createUnit(unit: IUnit){
    return this._store.create(unit)
  }

  deleteUnit(id){
    return this._store.delete(id)
  }

  getUnits(id = ''){
    return this._store.read(id)
  }

  onGetUnits(){
    if (this._store.units) return this._store.units
    return this.getUnits()
  }

  static create(){
    if (Service.instance) return Service.instance
    Service.instance = new Service(useCategoryStore())
    return Service.instance
  }
}

export const useUnitService = () => new Service(useUnitStore())

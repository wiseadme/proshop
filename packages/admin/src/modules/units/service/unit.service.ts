import { Store } from 'nervue'
import { useUnitStore } from '@modules/units/store'
import { IUnit } from '@ecommerce-platform/types'
import { IUnitActions, IUnitState } from '@modules/units/types'

class Service {
  private _store: Store<string, IUnitState, {}, {}, IUnitActions>
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
    Service.instance = new Service(useUnitStore())
    return Service.instance
  }
}

export const useUnitService = () => Service.create()

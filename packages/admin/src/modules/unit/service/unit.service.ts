import { Store } from 'nervue'
import { useUnitsStore } from '@modules/unit/store'
import { IUnit, Maybe } from '@ecommerce-platform/types'
import { IUnitActions, IUnitState } from '@modules/unit/types'

class Service {
  private _store: Store<string, IUnitState, {}, {}, IUnitActions>
  private _unit: Maybe<IUnit>
  static instance: Service

  constructor(store) {
      this._store = store
      this._unit = null
  }

  get units() {
      return this._store.units
  }

  setAsCurrent(unit: IUnit) {
      this._unit = unit
  }

  createUnit(unit: IUnit) {
      return this._store.create(unit)
  }

  updateUnit(updates) {
      updates._id = this._unit!._id
      return this._store.update(updates)
  }

  deleteUnit(id) {
      return this._store.delete(id)
  }

  getUnits(params?: Partial<IUnit>) {
      return this._store.read(params as any)
  }

  onGetUnits() {
      if (this._store.units) return this._store.units

      return this.getUnits()
  }

  static create() {
      if (Service.instance) return Service.instance
      Service.instance = new Service(useUnitsStore())
      return Service.instance
  }
}

export const useUnitService = () => Service.create()

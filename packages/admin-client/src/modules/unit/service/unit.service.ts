import { Store } from 'pinia'
import { useUnitStore } from '@modules/unit/store'
import { useAppStore } from '@app/store'

class Service {
  private _store: Store<string, IUnitState, {}, IUnitActions>
  private _appStore: Store<string, any, {}, any>
  static instance: Service

  constructor(store, appStore) {
    this._store = store
    this._appStore = appStore
  }

  get units() {
    return this._appStore.units
  }

  createUnit(unit: IUnit) {
    return this._store.create(unit)
  }

  deleteUnit(id) {
    return this._store.delete(id).then(() => this.getUnits())
  }

  getUnits(id = '') {
    return this._appStore.getUnits(id)
  }

  onGetUnits() {
    if (this._store.units) return this._store.units
    return this.getUnits()
  }

  static create() {
    if (Service.instance) return Service.instance
    Service.instance = new Service(useUnitStore(), useAppStore())
    return Service.instance
  }
}

export const useUnitService = () => Service.create()

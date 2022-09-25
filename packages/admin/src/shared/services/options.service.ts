import { useOptionsStore } from '@shared/store/options'

export class Service {
  private _store: ReturnType<typeof useOptionsStore>
  static instance: Service

  constructor(store){
    this._store = store
  }

  async createOption(option){
    return await this._store.createOption(option)
  }

  async updateOption(updates){
    return await this._store.updateOption(updates)
  }

  async deleteOption(option){
    return await this._store.deleteOption(option._id)
  }

  static create(){
    if (Service.instance) return Service.instance

    Service.instance = new Service(useOptionsStore())

    return Service.instance
  }
}


export const useOptionsService = () => Service.create()

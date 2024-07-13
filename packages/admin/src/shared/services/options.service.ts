import { useOptionsStore } from '@shared/store/options'

export class Service {
    private _store: ReturnType<typeof useOptionsStore>
    static instance: Service

    constructor(store){
        this._store = store
    }

    async createOption(option){
        return this._store.createOption(option)
    }

    async updateOption(updates){
        return this._store.updateOption(updates)
    }

    async deleteOption(option){
        return this._store.deleteOption(option.id)
    }

    static create(){
        if (Service.instance) return Service.instance

        Service.instance = new Service(useOptionsStore())

        return Service.instance
    }
}


export const useOptionsService = () => Service.create()

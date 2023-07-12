import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { ISite } from '@proshop/types'

class Repository implements IRepository {
    rest: IRest = rest
    baseUrl: string = '/v1/settings/site'

    create(siteConfig: ISite){
        return rest.post(this.baseUrl, siteConfig)
    }

    read(){
        return rest.get(this.baseUrl)
    }

    update(updates: Partial<ISite>){
        return this.rest.patch(this.baseUrl, updates)
    }

    delete(id: string){
        return this.rest.delete(this.baseUrl, { params: { id } })
    }
}

export const useSiteRepository = () => new Repository()

import type { ISite } from '@proshop-app/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository<ISite> {
    client: IRest<ISite>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    create(siteConfig: ISite){
        return this.client.post(this.path, siteConfig)
    }

    read(){
        return this.client.get(this.path)
    }

    update(updates: Partial<ISite>){
        return this.client.patch(this.path, updates)
    }

    delete(id: string){
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useSiteRepository = () => new Repository({
    client: rest,
    path: '/api/v1/settings/site'
})

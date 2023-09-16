import { rest } from '@shared/api'
import { IRest } from '@shared/types/app'
class Repository {
    client: IRest
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }
    create(metaTag) {
        return this.client.post(this.path, metaTag)
    }

    getToken(params) {
        return this.client.get(`${this.path}/access_token`, { params })
    }

    update(updates) {
        return this.client.patch(this.path, updates)
    }

    delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useVKRepository = () => new Repository({
    client: rest,
    path: 'https://oauth.vk.com/'
})

import type { ISettings } from '@proshop-app/types'

import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'

class Repository implements IRepository<ISettings> {
    client: IRest<ISettings>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }

    async create() {
        return { data: null } as any
    }

    async read() {
        return this.client.get(this.path)
    }

    async update() {
        return { data: null } as any
    }

    async delete(id: string) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useSettingsRepository = () => new Repository({
    client: rest,
    path: '/api/v1/settings'
})

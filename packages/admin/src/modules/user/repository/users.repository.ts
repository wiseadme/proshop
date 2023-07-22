import { rest } from '@shared/api'
import { IRepository, IRest } from '@shared/types/app'
import { IUser } from '@proshop/types'

class Repository implements IRepository<IUser> {
    client: IRest<IUser>
    path: string

    constructor({ client, path }) {
        this.client = client
        this.path = path
    }
    create(user) {
        return this.client.post(this.path + '/create', user)
    }

    read(params) {
        return this.client.get(this.path, { params })
    }

    update(updates) {
        return this.client.patch(this.path, updates)
    }

    delete(id) {
        return this.client.delete(this.path, { params: { id } })
    }
}

export const useUsersRepository = () => new Repository({
    client: rest,
    path: '/api/v1/user'
})

import { IUser } from '@proshop-app/types'

export interface IUserRepository {
    create(params): Promise<IUser>

    find(params: Partial<IUser>): Promise<IUser[]>

    update(updates: any): Promise<{ updated: IUser }>

    delete(id: string): Promise<boolean>
}

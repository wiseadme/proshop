import { IUser } from '@ecommerce-platform/types'

export interface IUserRepository {
  create(params): Promise<Record<'id', string>>

  read(params: Partial<IUser>): any

  update(updates: any): Promise<{ updated: any }>

  delete(id: string): Promise<boolean>
}

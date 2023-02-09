import { Document } from 'mongoose'
import { IUser } from '@ecommerce-platform/types'

export interface IUserRepository {
  create(params): Promise<IUser & Document>

  read(params: Partial<IUser>): Promise<(IUser & Document)[]>

  update(updates: any): Promise<{ updated: IUser & Document }>

  delete(id: string): Promise<boolean>
}

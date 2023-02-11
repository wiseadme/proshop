import { Document } from 'mongoose'
import { Response } from 'express'
import { IUser } from '@ecommerce-platform/types'

type RegistrationAccessResponse = {
  access_token: string
}

export interface IUserService {
  login(params, res: Response): Promise<IUser & Document>

  logout(cookies: Record<string, string>, res: Response): Promise<any>

  create(user): Promise<IUser & Document>

  getUsers(params: Partial<IUser>): Promise<(IUser & Document)[]>

  deleteUser(id: string): Promise<boolean>

  whoami(cookies: Record<string, string>): Promise<IUser & Document>

  refresh(cookies: Record<string, string>, res: Response): Promise<IUser & Document>
}

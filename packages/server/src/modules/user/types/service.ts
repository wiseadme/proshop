import { Response } from 'express'
import { IUser } from '@proshop-app/types'

type RegistrationAccessResponse = {
    access_token: string
}

export interface IUserService {
    login(params: { username: string, password: string }, res: Response): Promise<IUser>

    logout(cookies: Record<string, string>, res: Response): Promise<any>

    create(user): Promise<IUser>

    getUsers(params: Partial<IUser>): Promise<IUser[]>

    deleteUser(id: string): Promise<boolean>

    whoami(cookies: Record<string, string>): Promise<IUser>

    refresh(cookies: Record<string, string>, res: Response): Promise<IUser>
}

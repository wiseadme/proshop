import { Response } from 'express'

type RegistrationAccessResponse = {
  access_token: string
}

export interface IUserService {
  login(params, res: Response): Promise<any>

  logout(cookies: Record<string, string>, res: Response): Promise<any>

  create(user): Promise<any>

  whoami(cookies: Record<string, string>): Promise<any>

  refresh(cookies: Record<string, string>, res: Response): Promise<any>
}

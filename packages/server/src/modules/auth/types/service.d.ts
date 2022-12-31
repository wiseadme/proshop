import { Response } from 'express'

type RegistrationAccessResponse = {
  access_token: string
}

export interface IAuthService {
  loginUser(params, res: Response): Promise<any>

  logoutUser(cookies: Record<string, string>, res: Response): Promise<any>

  createUser(user, cookies): Promise<any>

  checkMe(cookies: Record<string, string>): Promise<any>

  updateToken(refreshToken: string): Promise<any>
}

type RegistrationAccessResponse = {
  access_token: string
}

export interface IAuthService {
  loginUser(params): Promise<any>

  createUser(user, cookies): Promise<any>

  checkMe(cookies: Record<string, string>): Promise<any>

  updateToken(refreshToken: string): Promise<any>
}

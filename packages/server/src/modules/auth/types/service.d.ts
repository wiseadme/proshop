type RegistrationAccessResponse = {
  access_token: string
}

export interface IAuthService {
  login(params): Promise<any>
}

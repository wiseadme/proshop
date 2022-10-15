type RegistrationAccessResponse = {
  access_token: string
}

export interface IAuthService {
  getRegistrationAccessToken(): Promise<RegistrationAccessResponse>
}

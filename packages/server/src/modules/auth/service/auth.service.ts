// @ts-ignore
import KeycloakAdminClient from '@keycloak/keycloak-admin-client'
import { injectable } from 'inversify'
import { prepareResponseData, isExpired } from '@modules/auth/helpers'
import config from '@app/config'
// Types
import { IAuthService } from '@modules/auth/types/service'
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'

@injectable()
export class AuthService extends KeycloakAdminClient implements IAuthService {
  constructor(){
    super()

    this.setConfig({
      baseUrl: config.keycloakServer,
      realmName: config.keycloakRealm
    })
  }

  createUserLoginParams(user): Credentials{
    return {
      username: user.username,
      password: user.password,
      grantType: 'password',
      clientId: config.keycloakClientId!,
      clientSecret: config.keycloakClientSecret
    }
  }

  createUserParams(user): UserRepresentation{
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      enabled: false,
      attributes: {
        phone: user.phone,
      },
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false
        }
      ],
      clientRoles: {
        user: true
      }
    }
  }

  createRefreshParams(rToken: string){
    return {
      grantType: 'refresh_token',
      refreshToken: rToken,
      clientId: config.keycloakClientId
    }
  }

  async loginUser(user){
    await this.auth(this.createUserLoginParams(user))

    const data = prepareResponseData(this)
    const accessToken = data.accessToken

    delete data.accessToken

    return {
      data,
      accessToken
    }
  }

  async logoutUser(){

  }

  async createUser(user, cookies){
    this.setAccessToken(cookies.auth)

    return await this.users.create(this.createUserParams(user))
  }

  async updateToken(refreshToken){
    return this.auth(this.createRefreshParams(refreshToken) as Credentials)
  }

  async checkMe(cookies){
    if (isExpired(cookies.auth)) {
      return Promise.reject({
        status: 401,
        message: 'Unauthorized'
      })
    }

    this.setAccessToken(cookies.auth)

    const { exp, phone, email, role } = prepareResponseData({
      accessToken: cookies.auth
    })

    return {
      ...await this.whoAmI.find(),
      exp,
      phone,
      email,
      role
    }
  }
}

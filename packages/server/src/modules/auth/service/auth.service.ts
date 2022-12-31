// @ts-ignore
import KeycloakAdminClient from '@keycloak/keycloak-admin-client'
import { inject, injectable } from 'inversify'
import { prepareResponseData, isExpired } from '@modules/auth/helpers'
import config from '@app/config'
// Types
import { IAuthService } from '@modules/auth/types/service'
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import { TYPES } from '@common/schemes/di-types'
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'
import { IAuthRepository } from '@modules/auth/types/repository'

@injectable()
export class AuthService extends KeycloakAdminClient implements IAuthService {
  constructor(
    @inject(TYPES.REPOSITORIES.IAuthRepository) private repository: IAuthRepository
  ){
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

  async loginUser(user, res){
    await this.auth(this.createUserLoginParams(user))

    const {
      exp,
      phone,
      email,
      role
    } = prepareResponseData(this)

    const { accessToken, refreshToken } = this
    const whoAmI = await this.whoAmI.find()
    const { userId } = whoAmI

    await this.repository.create({
      accessToken,
      refreshToken,
      userId
    })

    res.cookie('auth', accessToken, {
      sameSite: true,
      httpOnly: true,
      maxAge: 100000000,
      path: '/'
    })

    return {
      ...whoAmI,
      exp,
      phone,
      email,
      role,
    }
  }

  async logoutUser(cookies, res){
    const [ user ] = await this.repository.read(cookies.auth)

    this.setAccessToken(cookies.auth)

    await this.repository.delete(user._id)

    res.clearCookie('auth')

    return this.users.logout({ id: user.userId })
  }

  async createUser(user, cookies){
    this.setAccessToken(cookies.auth)

    return await this.users.create(this.createUserParams(user))
  }

  async updateToken(accessToken){
    const auth = await this.repository.read(accessToken)

    return this.auth(this.createRefreshParams(auth.refreshToken) as Credentials)
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

    const whoAmI = await this.whoAmI.find()

    return {
      ...whoAmI,
      exp,
      phone,
      email,
      role
    }
  }
}

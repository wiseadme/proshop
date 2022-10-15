import request from 'request-promise'
import { injectable } from 'inversify'
import { KEYCLOAK_REG_TOKEN_REQ_OPTIONS } from '@common/constants/keycloak'
// Types
import { IAuthService } from '../types/service'

@injectable()
export class AuthService implements IAuthService {
  async getRegistrationAccessToken(){
    return await request(KEYCLOAK_REG_TOKEN_REQ_OPTIONS)
  }

  async login(user){

  }
}

import request from 'request-promise'
import { injectable } from 'inversify'
import { genLoginParams } from '@modules/auth/helpers'
// Types
import { IAuthService } from '@modules/auth/types/service'

@injectable()
export class AuthService implements IAuthService {
  async login(user){
    return await request(genLoginParams(user))
  }
}

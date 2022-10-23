import request from 'request-promise'
import { injectable } from 'inversify'
import { genLoginParams, prepareResponseData } from '@modules/auth/helpers'
// Types
import { IAuthService } from '@modules/auth/types/service'

@injectable()
export class AuthService implements IAuthService {
  async login(user){
    const data = await request(genLoginParams(user))

    return prepareResponseData(data)
  }
}

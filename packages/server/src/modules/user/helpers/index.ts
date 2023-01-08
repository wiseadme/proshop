import jwt from 'jsonwebtoken'
import { IUser } from '@ecommerce-platform/types'
import config from '@app/config'

export class UserHelpers {
  prepareUserResponseData(user: IUser) {
    return {
      username: user.username,
      email: user.email,
      roles: user.roles,
      phone: user.phone,
    }
  }

  isAccessTokenExpired(token) {
    return Date.now() >= (jwt.decode(token).exp * 1000)
  }

  genJWToken({ payload, secret, expiresIn }) {
    return jwt.sign(payload, secret, { expiresIn })
  }
}

import jwt from 'jsonwebtoken'
import { IUser } from '@ecommerce-platform/types'

export class UserHelpers {
  prepareUserResponseData(user: IUser) {
    const { accessToken } = user

    const userData: any = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      phone: user.phone,
    }

    if (accessToken && !this.isAccessTokenExpired(accessToken)) {
      userData.exp = jwt.decode(user.accessToken)?.exp
    } else {
      delete userData.exp
    }

    return userData
  }

  isAccessTokenExpired(token) {
    return Date.now() >= (jwt.decode(token).exp * 1000)
  }

  genJWToken({ payload, secret, expiresIn }) {
    return jwt.sign(payload, secret, { expiresIn })
  }
}

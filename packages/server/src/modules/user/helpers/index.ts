import jwt from 'jsonwebtoken'
import { IUser } from '@ecommerce-platform/types'

export class UserHelpers {
  prepareUserResponseData(user: IUser) {

    if (!user) {
      return Promise.reject({
        status: 401,
        message: 'Unauthorized'
      })
    }

    const userData: any = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      phone: user.phone,
    }

    if (user.accessToken && !this.isExpired(user.accessToken)) {
      userData.exp = jwt.decode(user.accessToken)?.exp
    } else {
      delete userData.exp
    }

    return userData
  }

  isExpired(token) {
    return Date.now() >= (jwt.decode(token).exp * 1000)
  }

  genJWToken({ payload, secret, expiresIn }) {
    return jwt.sign(payload, secret, { expiresIn })
  }
}

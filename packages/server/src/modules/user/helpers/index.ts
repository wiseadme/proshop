import jwt from 'jsonwebtoken'
import { IUser } from '@ecommerce-platform/types'
import { isExpired, parseJWToken } from '@common/helpers'

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

    if (user.accessToken && !isExpired(user.accessToken)) {
      userData.exp = parseJWToken(user.accessToken)?.exp
    } else {
      delete userData.exp
    }

    return userData
  }
}

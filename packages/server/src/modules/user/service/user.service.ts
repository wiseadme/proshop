import { inject, injectable } from 'inversify'
import { UserHelpers } from '@modules/user/helpers'
import bcrypt from 'bcryptjs'
// Types
import { IUserService } from '@modules/user/types/service'
import { TYPES } from '@common/schemes/di-types'
import { IUserRepository } from '@modules/user/types/repository'
import config from '@app/config'

import { isExpired, genJWToken } from '@common/helpers'

const REFRESH_TOKEN_EXP = 60 * 60 * 12
const ACCESS_TOKEN_EXP = 60

@injectable()
export class UserService extends UserHelpers implements IUserService {
  constructor(
    @inject(TYPES.REPOSITORIES.IUserRepository) private repository: IUserRepository
  ) {
    super()
  }

  async login(user, res) {
    const { password, username } = user

    const [ candidate ] = await this.repository.read({ username })

    if (candidate) {
      const isPasswordValid = await bcrypt.compareSync(password, candidate.password)

      delete candidate.accessToken
      delete candidate.refreshToken

      if (isPasswordValid) {

        const accessToken = genJWToken({
          payload: this.prepareUserResponseData(candidate),
          secret: config.accessSecret,
          expiresIn: ACCESS_TOKEN_EXP
        })

        const refreshToken = genJWToken({
          payload: this.prepareUserResponseData(candidate),
          secret: config.refreshSecret,
          expiresIn: REFRESH_TOKEN_EXP
        })

        const { updated } = await this.repository.update({
          _id: candidate._id,
          accessToken,
          refreshToken,
        })

        res.cookie('auth', accessToken, {
          sameSite: true,
          httpOnly: true,
          maxAge: 100000000,
          path: '/'
        })

        return this.prepareUserResponseData(updated)
      } else {
        return Promise.reject({
          status: 401,
          message: 'Login or password is wrong'
        })
      }
    } else {
      return Promise.reject({
        status: 404,
        message: 'User not found'
      })
    }
  }

  async logout(cookies, res) {
    const [ user ] = await this.repository.read({
      accessToken: cookies.auth
    })

    await this.repository.update({
      _id: user._id,
      accessToken: null,
      refreshToken: null
    })

    res.clearCookie('auth')

    return true
  }

  async create(user) {
    const [ checkedUser ] = await this.repository.read({
      email: user.email
    })

    if (!checkedUser) {
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(user.password, salt)

      return await this.repository.create(user)
    } else {
      return Promise.reject({
        status: 409,
        message: 'User already exists'
      })
    }
  }

  async getUsers(params) {
    const users = await this.repository.read(params)

    return users.map(user => this.prepareUserResponseData(user))
  }

  async refresh(cookies, res) {
    const [ user ] = await this.repository.read({
      accessToken: cookies.auth
    })

    if (user) {
      const userInfo = this.prepareUserResponseData(user)

      delete userInfo.exp

      const accessToken = genJWToken({
        payload: userInfo,
        secret: config.accessSecret,
        expiresIn: ACCESS_TOKEN_EXP
      })

      const refreshToken = genJWToken({
        payload: userInfo,
        secret: config.refreshSecret,
        expiresIn: REFRESH_TOKEN_EXP
      })

      const { updated } = await this.repository.update({
        _id: user._id,
        accessToken,
        refreshToken,
      })

      res.cookie('auth', accessToken, {
        sameSite: true,
        httpOnly: true,
        maxAge: 999999,
        path: '/'
      })

      return this.prepareUserResponseData(updated)
    }

    return Promise.reject({
      status: 403,
      message: 'Forbidden'
    })
  }

  async whoami(cookies) {
    if (!cookies.auth) {
      return Promise.reject({
        status: 401,
        message: 'Unauthorized'
      })
    }

    const [ user ] = await this.repository.read({
      accessToken: cookies.auth
    })

    if (user && isExpired(user.accessToken!)) {
      return Promise.reject({
        status: 401,
        message: 'Unauthorized'
      })
    }

    return this.prepareUserResponseData(user)
  }
}

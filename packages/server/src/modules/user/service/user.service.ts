import { inject, injectable } from 'inversify'
import { UserHelpers } from '@modules/user/helpers'
import bcrypt from 'bcryptjs'
// Types
import { IUserService } from '@modules/user/types/service'
import { TYPES } from '@common/schemes/di-types'
import { IUserRepository } from '@modules/user/types/repository'
import config from '@app/config'

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

      if (isPasswordValid) {

        const accessToken = this.genJWToken({
          payload: this.prepareUserResponseData(candidate),
          secret: config.accessSecret,
          expiresIn: 60
        })

        const refreshToken = this.genJWToken({
          payload: this.prepareUserResponseData(candidate),
          secret: config.refreshSecret,
          expiresIn: 60 * 60 * 12
        })

        await this.repository.update({
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

        return this.prepareUserResponseData(candidate)
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
    const [ user ] = await this.repository.read(cookies.auth)

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

  async refresh(cookies, res) {
    const [ user ] = await this.repository.read(cookies.auth)

    if (user) {
      const accessToken = this.genJWToken({
        payload: this.prepareUserResponseData(user),
        secret: config.accessSecret,
        expiresIn: 60
      })

      const refreshToken = this.genJWToken({
        payload: this.prepareUserResponseData(user),
        secret: config.refreshSecret,
        expiresIn: 60 * 60 * 12
      })

      await this.repository.update({
        id: user._id,
        accessToken,
        refreshToken,
      })

      res.cookie('auth', accessToken, {
        sameSite: true,
        httpOnly: true,
        maxAge: 100000000,
        path: '/'
      })

      return this.prepareUserResponseData(user)
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

    if (user && this.isAccessTokenExpired(cookies.auth)) {
      return await this.repository.delete(user._id)
    }

    const { phone, email, roles } = this.prepareUserResponseData(user)

    return {
      phone,
      email,
      roles
    }
  }
}

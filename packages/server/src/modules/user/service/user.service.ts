import { inject, injectable } from 'inversify'
import { isExpired, prepareResponseData } from '@modules/user/helpers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// Types
import { IUserService } from '@modules/user/types/service'
import { TYPES } from '@common/schemes/di-types'
import { IUserRepository } from '@modules/user/types/repository'
import config from '@app/config'

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.REPOSITORIES.IUserRepository) private repository: IUserRepository
  ){
  }

  async login(user, res){
    const { password, login } = user
    const candidate = await this.repository.read(login)

    if (candidate) {
      const isPasswordValid = await bcrypt.compareSync(password, candidate.password)

      if (isPasswordValid) {
        const payload = {
          login: candidate.login,
          phone: candidate.phone,
          email: candidate.email,
          roles: candidate.roles,
        }
        const expiresIn = 60
        const accessToken = jwt.sign(payload, config.accessSecret, { expiresIn })
        const refreshToken = jwt.sign(payload, config.refreshSecret, { expiresIn: 60 * 60 * 24 })

        await this.repository.update({
          _id: candidate._id,
          accessToken,
          refreshToken,
          expiresIn
        })

        res.cookie('auth', accessToken, {
          sameSite: true,
          httpOnly: true,
          maxAge: 100000000,
          path: '/'
        })

        return prepareResponseData(candidate)
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

  async logout(cookies, res){
    const [ user ] = await this.repository.read(cookies.auth)

    await this.repository.update({
      _id: user._id,
      accessToken: null,
      refreshToken: null
    })

    res.clearCookie('auth')

    return true
  }

  async create(user){
    const [ checkedUser ] = await this.repository.read(user.email)

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

  async refresh(cookies, res){
    const [ auth ] = await this.repository.read(cookies.auth)

    // await this.auth(this.createRefreshParams(auth.refreshToken) as Credentials)
    //
    // const { accessToken, refreshToken } = this
    // const { exp, phone, email, role } = prepareResponseData(this)

    // const whoAmI = await this.whoAmI.find()

    // res.cookie('auth', accessToken, {
    //   sameSite: true,
    //   httpOnly: true,
    //   maxAge: 100000000,
    //   path: '/'
    // })

    // await this.repository.update({
    //   id: auth._id,
    //   accessToken,
    //   refreshToken,
    // })

    return {
      // ...whoAmI,
      // exp,
      // phone,
      // email,
      // role
    }
  }

  async whoami(cookies){
    if (!cookies.auth || isExpired(cookies.auth)) {
      if (cookies.auth) {
        const [ auth ] = await this.repository.read(cookies.auth)

        auth && await this.repository.delete(auth._id)
      }

      return Promise.reject({
        status: 401,
        message: 'Unauthorized'
      })
    }

    // this.setAccessToken(cookies.auth)

    const { exp, phone, email, roles } = prepareResponseData({
      accessToken: cookies.auth
    })

    // const whoAmI = await this.whoAmI.find()

    return {
      // ...whoAmI,
      exp,
      phone,
      email,
      roles
    }
  }
}

import { Response } from 'express'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcryptjs'
import { config } from '@app/config'
import { TYPES } from '@common/schemes/di-types'
// Types
import { IUserService } from '@modules/user/types/service'
import { IUserRepository } from '@modules/user/types/repository'
import { IUser } from '@proshop/types'

import { UserHelpers } from '@modules/user/helpers'
import { genJWToken, isExpired } from '@common/helpers'

import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from '@common/constants/counts'
import { USER_TOKEN_KEY } from '@common/constants/cookie-keys'

@injectable()
export class UserService extends UserHelpers implements IUserService {
    constructor(
        @inject(TYPES.REPOSITORIES.IUserRepository) private repository: IUserRepository,
    ) {
        super()
    }

    async login(user: { username: string, password: string }, res: Response) {
        const { password, username } = user

        const [ candidate ] = await this.repository.find({ username })

        if (candidate) {
            const isPasswordValid = await bcrypt.compareSync(password, candidate.password)

            delete candidate.accessToken
            delete candidate.refreshToken

            if (isPasswordValid) {

                const accessToken = genJWToken({
                    payload: this.prepareUserResponseData(candidate),
                    secret: config.accessSecret,
                    expiresIn: ACCESS_TOKEN_EXP,
                })

                const refreshToken = genJWToken({
                    payload: this.prepareUserResponseData(candidate),
                    secret: config.refreshSecret,
                    expiresIn: REFRESH_TOKEN_EXP,
                })

                const { updated } = await this.repository.update({
                    id: candidate.id,
                    accessToken,
                    refreshToken,
                })

                if (!updated) {
                    return Promise.reject({
                        status: 401,
                        message: 'Unauthorized',
                    })
                }

                res.cookie(USER_TOKEN_KEY, accessToken, {
                    sameSite: true,
                    httpOnly: true,
                    maxAge: 100000000,
                    secure: true,
                    path: '/',
                })

                return this.prepareUserResponseData(updated)
            } else {
                return Promise.reject({
                    status: 401,
                    message: 'Login or password is wrong',
                })
            }
        } else {
            return Promise.reject({
                status: 404,
                message: 'User not found',
            })
        }
    }

    async logout(cookies, res) {
        const [ user ] = await this.repository.find({
            accessToken: cookies[USER_TOKEN_KEY],
        })

        await this.repository.update({
            id: user.id,
            accessToken: null,
            refreshToken: null,
        })

        res.clearCookie(USER_TOKEN_KEY)

        return true
    }

    async create(user: IUser) {
        const [ checkedUser ] = await this.repository.find({
            phone: user.phone,
        })

        if (!checkedUser) {
            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)

            return await this.repository.create(user)
        } else {
            return Promise.reject({
                status: 409,
                message: 'User already exists',
            })
        }
    }

    async getUsers(params) {
        const users = await this.repository.find(params)

        return users.map(user => this.prepareUserResponseData(user))
    }

    async refresh(cookies, res) {
        const [ user ] = await this.repository.find({
            accessToken: cookies[USER_TOKEN_KEY],
        })

        if (user) {
            const userInfo = this.prepareUserResponseData(user)

            delete userInfo.exp

            const accessToken = genJWToken({
                payload: userInfo,
                secret: config.accessSecret,
                expiresIn: ACCESS_TOKEN_EXP,
            })

            const refreshToken = genJWToken({
                payload: userInfo,
                secret: config.refreshSecret,
                expiresIn: REFRESH_TOKEN_EXP,
            })

            const { updated } = await this.repository.update({
                id: user.id,
                accessToken,
                refreshToken,
            })

            res.cookie(USER_TOKEN_KEY, accessToken, {
                sameSite: true,
                httpOnly: true,
                maxAge: 999999,
                secure: true,
                path: '/',
            })

            return this.prepareUserResponseData(updated)
        }

        return Promise.reject({
            status: 403,
            message: 'Forbidden',
        })
    }

    async whoami(cookies) {
        if (!cookies[USER_TOKEN_KEY]) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        const [ user ] = await this.repository.find({
            accessToken: cookies[USER_TOKEN_KEY],
        })

        if (user && isExpired(user.accessToken!)) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        return this.prepareUserResponseData(user)
    }

    async deleteUser(id: string) {
        return this.repository.delete(id)
    }
}

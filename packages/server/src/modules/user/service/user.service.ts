import { Response } from 'express'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcryptjs'
import { TYPES } from '@common/schemes/di-types'
// Types
import { IUserService } from '@modules/user/types/service'
import { IUserRepository } from '@modules/user/types/repository'
import { IUser } from '@proshop/types'

import { UserHelpers } from '@modules/user/helpers'
import { genJWTokens, isExpired } from '@common/helpers'

import { USER_TOKEN_KEY, COOKIE_PATH, COOKIE_MAX_AGE } from '@common/constants/cookie-keys'

@injectable()
export class UserService extends UserHelpers implements IUserService {
    constructor(
        @inject(TYPES.REPOSITORIES.IUserRepository) private repository: IUserRepository,
    ) {
        super()
    }

    async login(user: { username: string, password: string }, res: Response) {
        const { password, username } = user
        const [candidate] = await this.repository.find({ username })

        if (candidate) {
            const isPasswordValid = await bcrypt.compareSync(password, candidate.password)

            delete candidate.accessToken
            delete candidate.refreshToken

            if (isPasswordValid) {
                const tokens = genJWTokens(this.prepareUserResponseData(candidate))

                const { updated } = await this.repository.update({
                    id: candidate.id,
                    ...tokens,
                })

                if (!updated) {
                    return Promise.reject({
                        status: 401,
                        message: 'Unauthorized',
                    })
                }

                res.cookie(USER_TOKEN_KEY, tokens.accessToken, {
                    sameSite: true,
                    httpOnly: true,
                    secure: false,
                    maxAge: COOKIE_MAX_AGE,
                    path: COOKIE_PATH,
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

    async logout(cookies: Record<string, string>, res: Response) {
        const [user] = await this.repository.find({
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
        const [checkedUser] = await this.repository.find({
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

    async getUsers(params: { username: string, password: string }): Promise<IUser[]> {
        const users = await this.repository.find(params)

        return users.map(user => this.prepareUserResponseData(user))
    }

    async refresh(cookies: Record<string, string>, res: Response) {
        const [user] = await this.repository.find({
            accessToken: cookies[USER_TOKEN_KEY],
        })

        if (user) {
            const userInfo = this.prepareUserResponseData(user)

            delete userInfo.exp

            const tokens = genJWTokens(userInfo)

            const { updated } = await this.repository.update({
                id: user.id,
                ...tokens,
            })

            res.cookie(USER_TOKEN_KEY, tokens.accessToken, {
                sameSite: true,
                httpOnly: true,
                secure: false,
                maxAge: COOKIE_MAX_AGE,
                path: COOKIE_PATH,
            })

            return this.prepareUserResponseData(updated)
        }

        return Promise.reject({
            status: 403,
            message: 'Forbidden',
        })
    }

    async whoami(cookies: Record<string, string>) {
        if (!cookies[USER_TOKEN_KEY]) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        const [user] = await this.repository.find({
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

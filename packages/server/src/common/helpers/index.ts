import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { USER_TOKEN_KEY } from '@common/constants/cookie-keys'
import { config } from '@app/config'
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from '@common/constants/counts'

interface MiddlewareArguments {
    dto?: any,
    protect?: boolean
    roles?: string[]
}

interface ProtectMiddlewareArguments {
    roles?: string[]
}

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => any

export const parseJWToken = (token: string) => jwt.decode(token)

export const isExpired = (token: string): boolean => {
    const { exp } = parseJWToken(token)

    return Date.now() >= (exp * 1000)
}

export const genJWToken = ({ payload, secret, expiresIn }): string => {
    delete payload.exp

    return jwt.sign(payload, secret, { expiresIn })
}

export const genJWTokens = (payload: Record<string, any>) => ({
    accessToken: genJWToken({
        secret: config.accessSecret,
        expiresIn: ACCESS_TOKEN_EXP,
        payload,
    }),
    refreshToken: genJWToken({
        secret: config.refreshSecret,
        expiresIn: REFRESH_TOKEN_EXP,
        payload,
    })
})

export const verifyJWToken = (token: string) => new Promise((resolve, reject) => {
    jwt.verify(token, config.accessSecret, (err: any) => {
        if (err) reject(false)

        resolve(true)
    })
})

const protect = ({ roles }: ProtectMiddlewareArguments) => {
    return async ({ cookies }: Request, response: Response, next: NextFunction) => {

        try {
            await verifyJWToken(cookies[USER_TOKEN_KEY])

            const parsed = parseJWToken(cookies[USER_TOKEN_KEY])
            const userRoles = parsed.roles
            const ret = roles!.every(role => userRoles.includes(role))

            if (ret && !isExpired(cookies[USER_TOKEN_KEY])) {
                return next()
            }

            response.status(403).json({
                status: 403,
                message: 'Forbidden for this role',
            })
        } catch (err: any) {
            response.status(501).json({
                status: 501,
                message: err.message ?? err,
            })
        }
    }
}

export const setMiddlewares = (props: MiddlewareArguments | null = null) => {
    const middlewares: MiddlewareFn[] = []

    props?.dto && middlewares.push(new ValidateMiddleware(props.dto).execute())
    props?.roles && middlewares.push(protect({ roles: props.roles }))

    return middlewares
}

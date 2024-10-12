import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { NextFunction, Request, response, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CUSTOMER_TOKEN_KEY, USER_TOKEN_KEY } from '@common/constants/cookie-keys'
import { config } from '@app/config'
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from '@common/constants/counts'
import { Maybe } from '@proshop-app/types'

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
    if (!token) return true

    const { exp } = parseJWToken(token)

    return Date.now() >= (exp * 1000)
}

export const genJWToken = ({ payload, secret, expiresIn }): string => {
    delete payload.exp

    return jwt.sign(payload, secret, { expiresIn })
}

export const genJWTokens = (payload: Record<string, any>): { accessToken: string, refreshToken: string } => ({
    accessToken: genJWToken({
        secret: config.accessSecret,
        expiresIn: ACCESS_TOKEN_EXP,
        payload,
    }),
    refreshToken: genJWToken({
        secret: config.refreshSecret,
        expiresIn: REFRESH_TOKEN_EXP,
        payload,
    }),
})

export const verifyJWToken = (token: string): Promise<boolean> => new Promise((resolve) => {
    jwt.verify(token, config.accessSecret, (err: any) => resolve(!Boolean(err)))
})

export const getTokenChecker = (key?: string) => {
    return async ({ cookies }: Request, response: Response, next: NextFunction) => {
        let token = key ? cookies[key] : undefined

        token ??= cookies[USER_TOKEN_KEY]
        token ??= cookies[CUSTOMER_TOKEN_KEY]

        try {
            const isVerified = await verifyJWToken(token)
            const state = isExpired(token)

            next(!isVerified || state ? {
                status: 401,
                message: 'Unauthorized',
            } : null)
        } catch (err: any) {
            next({
                status: 501,
                message: err.message ?? err ?? 'Server error',
            })
        }
    }
}

export const checkToken = async ({ cookies }: Request, response: Response, next: NextFunction) => {
    try {
        const isVerified = await verifyJWToken(cookies[USER_TOKEN_KEY])
        const state = isExpired(cookies[USER_TOKEN_KEY])

        next(!isVerified || state ? {
            status: 401,
            message: 'Unauthorized',
        } : null)
    } catch (err: any) {
        next({
            status: 501,
            message: err.message ?? err ?? 'Server error',
        })
    }
}

export const protect = ({ roles }: ProtectMiddlewareArguments) => {
    return ({ cookies }: Request, response: Response, next: NextFunction) => {
        try {
            const parsed = parseJWToken(cookies[USER_TOKEN_KEY])
            const userRoles = parsed.roles
            const hasRights = roles!.some(role => userRoles.includes(role))

            next(!hasRights ? {
                status: 403,
                message: 'Forbidden for this role',
            } : null)
        } catch (err: any) {
            next({
                status: 501,
                message: err.message ?? err ?? 'Server error',
            })
        }
    }
}

export const setMiddlewares = (props: Maybe<MiddlewareArguments> = null) => {
    const middlewares: MiddlewareFn[] = [checkToken]

    props?.dto && middlewares.push(new ValidateMiddleware(props.dto).execute())
    props?.roles && middlewares.push(protect({ roles: props.roles }))

    return middlewares
}

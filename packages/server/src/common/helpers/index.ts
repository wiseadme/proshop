import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { USER_TOKEN_KEY } from '@common/constants/cookie-keys'

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

const protect = ({ roles }: ProtectMiddlewareArguments) => {
    return ({ cookies }: Request, response: Response, next: NextFunction) => {
        let ret = true

        if (roles) {
            const parsed = parseJWToken(cookies[USER_TOKEN_KEY])
            const userRoles = parsed.roles

            ret = roles.every(role => userRoles.includes(role))
        }

        if (ret && !isExpired(cookies[USER_TOKEN_KEY])) {
            next()
        } else {
            throw ({
                status: 403,
                message: 'Forbidden for this role',
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

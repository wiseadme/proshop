import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type SetMiddlewareArguments = {
    dto?: any,
    protect?: boolean
    roles?: string[]
}

type ProtectMiddlewareArguments = {
    roles?: string[]
}

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
            const parsed = parseJWToken(cookies.auth)
            const userRoles = parsed.roles

            ret = roles.every(role => userRoles.includes(role))
        }

        if (ret && !isExpired(cookies.auth)) {
            next()
        } else {
            throw ({
                status: 403,
                message: 'Forbidden for this role',
            })
        }
    }
}

export const setMiddlewares = (props: SetMiddlewareArguments | null = null) => {
    const middlewares: any[] = []

    props?.dto && middlewares.push(new ValidateMiddleware(props.dto).execute())
    props?.roles && middlewares.push(protect({ roles: props.roles }))

    return middlewares
}

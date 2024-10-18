import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { isExpired } from '@common/helpers'
import { IMiddleware } from '@/types/middlewares'
import { X_AUTH_REQUEST, X_CLIENT_ID, X_CLIENT_REQUEST } from '@proshop-app/constants'

@injectable()
export class AuthMiddleware implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction) {
        const { auth_token, user_token } = req.cookies

        const clientId = req.headers[X_CLIENT_ID]
        const isClientRequest = req.headers[X_CLIENT_REQUEST]
        const isAuthRequest = req.headers[X_AUTH_REQUEST]

        /**
         * @description - если запрос прилетает от клиента магазина
         * по апи где требуется наличие авторизации
         */
        if ((!auth_token || isExpired(auth_token))
            && clientId
            && isClientRequest
            && isAuthRequest
        ) {
            return res.status(403).json({
                ok: false,
                status: 403,
                message: 'Forbidden for you asshole'
            })
        }

        next()
    }
}

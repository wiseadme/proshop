import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { isExpired } from '@common/helpers'
import { IMiddleware } from '@/types/middlewares'

@injectable()
export class AuthMiddleware implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction) {
        const { auth } = req.cookies

        // console.log(req.headers)

        if (!auth || isExpired(auth)) {
            // throw ({
            //   ok: false,
            //   status: 403,
            //   message: 'Forbidden for you asshole'
            // })
        }

        next()
    }
}

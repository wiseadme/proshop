import session from 'express-session'
import { injectable } from 'inversify'
import { config } from '@app/config'
import { IMiddleware } from '@/types/middlewares'

@injectable()
export class SessionMiddleware implements IMiddleware {
    public bind: true
    public execute: ReturnType<typeof session> = session({
        secret: config.accessSecret,
        resave: false,
        saveUninitialized: true,
    })
}

import session from 'express-session'
import { injectable } from 'inversify'
import config from '@app/config'
import { IMiddleware } from '@/types/middlewares'
import { memoryStore } from '@common/plugins/keycloak'

@injectable()
export class SessionMiddleware implements IMiddleware {
  public bind: true
  public execute: ReturnType<typeof session> = session({
    secret: config.keycloakAdminSecret,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
}

import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'
import { initKeycloak } from '@common/plugins/keycloak'

const keycloak = initKeycloak()

@injectable()
export class KeycloakMiddleware implements IExpressMiddleware {
  bind: false
  execute: ReturnType<typeof keycloak.middleware> = keycloak.middleware()
}

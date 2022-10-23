import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'
import { initKeycloak } from '@common/plugins/keycloak'
import { NextFunction, Request, Response } from 'express'
import config from '@app/config'

const keycloak = initKeycloak()

@injectable()
export class KeycloakMiddleware implements IExpressMiddleware {
  bind: false
  execute: ReturnType<typeof keycloak.middleware> = keycloak.middleware()
}


// execute(spec){
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = req.headers.authorization
//       const parsed = jwt.decode(token?.slice('bearer '.length))
//
//       console.log(token)
//
//       if (parsed?.resource_access[config.keycloakClientId!]?.roles.includes(spec)) {
//         return next()
//       }
//
//       throw {
//         status: 403,
//         message: 'access denied'
//       }
//     } catch (err) {
//       res.status((err as any).status).json({
//         ok: false,
//         data: null,
//         error: (err as any).message
//       })
//     }
//   }
// }

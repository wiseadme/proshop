import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '@app/config'

type SetMiddlewareArguments = {
  dto?: any,
  protect?: boolean
  roles?: string[]
}

type ProtectMiddlewareArguments = {
  roles?: string[]
}

const protect = ({ roles }: ProtectMiddlewareArguments) => {
  return ({ cookies }: Request, response: Response, next: NextFunction) => {
    let ret = true

    if (roles) {
      const parsed = jwt.decode(cookies.auth)
      const userRoles = parsed.resource_access[config.keycloakClientId]?.roles

      ret = roles.every(role => userRoles.includes(role))
    }

    if (ret) {
      next()
    } else {
      throw ({
        status: 403,
        message: 'Forbidden for this role'
      })
    }
  }
}

export const setMiddlewares = (props: SetMiddlewareArguments | null = null) => {
  const middlewares: any[] = []

  props?.dto && middlewares.push(new ValidateMiddleware(props.dto).execute())
  props?.protect && middlewares.push(protect(props.roles ? { roles: props.roles } : {}))

  return middlewares
}

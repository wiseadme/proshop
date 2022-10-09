import { ValidateMiddleware } from '@common/middlewares/validate.middleware'
import { getKeycloak } from '@common/plugins/keycloak'

type SetMiddlewareArguments = {
  dto?: any,
  protect?: boolean
  role?: string
}

export const setMiddlewares = (props: SetMiddlewareArguments | null = null) => {
  const middlewares: any[] = []

  props?.dto && middlewares.push(new ValidateMiddleware(props.dto).execute)
  props?.protect && middlewares.push(getKeycloak().protect(props?.role))

  return middlewares
}

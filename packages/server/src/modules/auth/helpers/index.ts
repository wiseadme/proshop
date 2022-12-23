import config from '@app/config'
import jwt from 'jsonwebtoken'

export const prepareResponseData = (data) => {
  const parsed = jwt.decode(data.accessToken)

  return {
    accessToken: data.accessToken,
    // refresh_token: data.refreshToken,
    // session_state: data.session_state,
    expiresIn: data.expiresIn,
    email: parsed.email,
    givenName: parsed.given_name,
    familyName: parsed.family_name,
    exp: parsed.exp,
    role: parsed.resource_access[config.keycloakClientId]?.roles,
    phone: parsed.phone
  }
}

export const isExpired = (token): boolean => {
  return Date.now() >= (jwt.decode(token).exp * 1000)
}

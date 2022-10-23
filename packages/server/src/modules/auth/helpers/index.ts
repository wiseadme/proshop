import config from '@app/config'
import jwt from 'jsonwebtoken'

export const genLoginParams = (user) => ({
  method: 'POST',
  uri: `${ config.keycloakServer }/realms/${ config.keycloakRealm }/protocol/openid-connect/token`,
  form: {
    client_id: config.keycloakClientId,
    client_secret: config.keycloakClientSecret,
    grant_type: 'password',
    ...user
  },
  json: true
})

export const prepareResponseData = (data) => {
  const parsed = jwt.decode(data.access_token)

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    session_state: data.session_state,
    email: parsed.email,
    given_name: parsed.given_name,
    family_name: parsed.family_name,
    exp: parsed.exp,
    expires_in: data.expires_in,
    role: parsed.resource_access[config.keycloakClientId].roles,
    mobile: parsed.mobile
  }
}

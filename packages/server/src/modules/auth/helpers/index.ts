import config from '@app/config'

export const genLoginParams = (user) => ({
  method: 'POST',
  uri: `${config.keycloakServer}/realms/${config.keycloakRealm}/protocol/openid-connect/token`,
  form: {
    client_id: config.keycloakClientId,
    client_secret: config.keycloakClientSecret,
    grant_type: 'client_credentials',
    ...user
  },
  json: true
})

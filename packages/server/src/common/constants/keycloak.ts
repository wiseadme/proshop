import config from '@app/config'

export const KEYCLOAK_REG_TOKEN_REQ_OPTIONS = Object.freeze({
  method: 'POST',
  uri: config.keycloakRegTokenUri,
  form: {
    client_id: config.keycloakAdminClientId,
    client_secret: config.keycloakAdminSecret,
    grant_type: 'client_credentials'
  },
  json: true
})

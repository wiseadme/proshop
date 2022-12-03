import config from '@app/config'
import session from 'express-session'

const Keycloak = require('keycloak-connect')

let _keycloak

/** TODO - replace MemoryStore for production */
export const memoryStore = new session.MemoryStore()

const keycloakConfig = {
  bearerOnly: true,
  clientId: config.keycloakClientId,
  serverUrl: config.keycloakServer,
  realm: config.keycloakRealm,
  credentials: {
    secret: config.keycloakClientSecret
  }
}

export const initKeycloak = () => {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again!')
    return _keycloak
  } else {
    console.log('Initializing Keycloak...')
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    return _keycloak
  }
}

export const getKeycloak = () => {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please called init first.')
  }
  return _keycloak
}

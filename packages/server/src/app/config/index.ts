import dotenv from 'dotenv'
import path from 'path'
import { IConfig } from '@/types'

const root = path.join.bind(this, __dirname)

dotenv.config({
  path: root('../../../.env')
})

export class Config implements IConfig {
  port = Number(process.env.PORT!)
  dbUri = process.env.MONGO_URI!
  secret = process.env.SECRET_KEY!
  uploadsDir = `/home/${process.env.USER}/www/uploads`!
  keycloakServer = process.env.KEYCLOAK_SERVER_URI
  keycloakRealm = process.env.KEYCLOAK_REALM
  keycloakClientId = process.env.KEYCLOAK_CLIENT_ID
  keycloakClientSecret = process.env.KEYCLOAK_CLIENT_SECRET
}

export default new Config()

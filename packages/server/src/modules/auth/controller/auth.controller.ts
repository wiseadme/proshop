import { Router } from 'express'
import request from 'request-promise'
import config from '@app/config'
import { injectable } from 'inversify'

@injectable()
export class AuthController {
  public path: string = '/v1/auth'
  public router: Router = Router()

  constructor(){
    this.initRoutes()
    this.login()
  }

  initRoutes(){
    this.router.post('/login', this.login.bind(this))
  }

  async login(){
    const options = {
      method: 'POST',
      uri: config.keycloakServer  + '/realms/master/protocol/openid-connect/token',
      form: {
        client_id: config.keycloakAdminClientId,
        client_secret: config.keycloakAdminSecret,
        grant_type: 'client_credentials'
      },
      json: true
    }
    try {
      const data = await request(options)
      console.log(data)
    } catch (error) {
      console.log(error, 'errrrrrrrrr')
    }
  }

  create(){

  }
}

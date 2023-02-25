import { genJWToken } from '@common/helpers'
import config from '@app/config'
import { CUSTOMER_ACCESS_TOKEN_EXP } from '@common/constants/counts'

export class CustomerHelpers {
  config: any

  constructor() {
    this.config = config
  }

  genAccessToken(payload) {
    return genJWToken({
      payload,
      secret: config.accessSecret,
      expiresIn: CUSTOMER_ACCESS_TOKEN_EXP
    })
  }

  setResponseCookie({ key, value, res }) {
    res.cookie(key, value, {
      sameSite: true,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 1000
    })
  }
}

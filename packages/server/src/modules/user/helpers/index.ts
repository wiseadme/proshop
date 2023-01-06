import config from '@app/config'
import jwt from 'jsonwebtoken'

export const prepareResponseData = (loginCandidate) => {
  return {
    email: loginCandidate.email,
    exp: loginCandidate.expiresIn,
    roles: loginCandidate.roles,
    phone: loginCandidate.phone
  }
}

export const isExpired = (token): boolean => {
  return Date.now() >= (jwt.decode(token).exp * 1000)
}

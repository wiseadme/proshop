import { parseJWToken, isExpired, genJWTokens } from '@common/helpers'
import { config } from '@app/config'
import { ICustomer } from '@proshop-app/types'
import { ACCESS_TOKEN_EXP } from '@common/constants/counts'

export class CustomerHelpers {
    config: any

    constructor() {
        this.config = config
    }

    setResponseCookie({ key, value, res }) {
        res.cookie(key, value, {
            sameSite: true,
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: ACCESS_TOKEN_EXP * 1000,
        })
    }

    generateTokens(customer: Partial<ICustomer>) {
        return genJWTokens(customer)
    }

    getUserIdFromToken(token: string): string {
        return parseJWToken(token)?.id
    }

    isExpired(token: string) {
        return isExpired(token)
    }
}

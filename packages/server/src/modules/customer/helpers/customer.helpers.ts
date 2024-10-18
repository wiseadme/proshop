import { parseJWToken, isExpired, genJWTokens } from '@common/helpers'
import { config } from '@app/config'
import { ICustomer } from '@proshop-app/types'
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from '@common/constants/counts'
import { injectable } from 'inversify'
import { Response } from 'express'
import * as process from 'node:process'

export interface ICustomerHelpers {
    setResponseCookie(params: { key: string, value: string, res: Response }): void

    generateTokens(customer: Partial<ICustomer>): { accessToken: string, refreshToken: string }

    getUserIdFromToken(token: string): string

    isExpired(token: string): boolean
}

@injectable()
export class CustomerHelpers implements ICustomerHelpers {
    config: any

    constructor() {
        this.config = config
    }

    setResponseCookie({ key, value, res }) {
        res.cookie(key, value, {
            sameSite: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: REFRESH_TOKEN_EXP * 1000,
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

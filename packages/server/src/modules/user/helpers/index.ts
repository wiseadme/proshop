import { IUser } from '@proshop-app/types'
import { isExpired, parseJWToken, genJWTokens } from '@common/helpers'

export class UserHelpers {
    prepareUserResponseData(user: IUser): IUser {
        const data: Partial<IUser> = {
            id: user.id,
            firstName: user.firstName,
            secondName: user.secondName,
            username: user.username,
            roles: user.roles,
            phone: user.phone,
            position: user.position,
            enabled: user.enabled
        }

        if (user.accessToken && !isExpired(user.accessToken)) {
            data.exp = parseJWToken(user.accessToken)?.exp
        } else {
            delete data.exp
        }

        return data as IUser
    }

    getUserIdFromToken(token: string): string {
        return parseJWToken(token)?.id
    }

    generateTokens(user: IUser) {
        return genJWTokens(user)
    }

    isExpired(token: string) {
        return isExpired(token)
    }
}

import {Document} from 'mongoose'
import { IUser } from '@proshop/types'
import { isExpired, parseJWToken } from '@common/helpers'

export class UserHelpers {
    prepareUserResponseData(user: IUser): IUser {
        const userData: Partial<IUser> = {
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
            userData.exp = parseJWToken(user.accessToken)?.exp
        } else {
            delete userData.exp
        }

        return userData as IUser
    }
}

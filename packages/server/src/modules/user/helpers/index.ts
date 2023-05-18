import { IUser } from '@ecommerce-platform/types'
import { isExpired, parseJWToken } from '@common/helpers'

export class UserHelpers {
    prepareUserResponseData(user: IUser) {
        if (!user) {
            return Promise.reject({
                status: 401,
                message: 'Unauthorized',
            })
        }

        const userData: any = {
            _id: user._id,
            firstName: user.firstName,
            secondName: user.secondName,
            username: user.username,
            roles: user.roles,
            phone: user.phone,
            position: user.position,
        }

        if (user.accessToken && !isExpired(user.accessToken)) {
            userData.exp = parseJWToken(user.accessToken)?.exp
        } else {
            delete userData.exp
        }

        return userData
    }
}

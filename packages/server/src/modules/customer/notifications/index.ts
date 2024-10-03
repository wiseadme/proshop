import { injectable } from 'inversify'
import { ICustomer } from '@proshop-app/types'

@injectable()
export class CustomerMessages {
    getGreetingMessage(customer: ICustomer) {
        return `Добро пожаловать в наш магазин. Вы авторизовались в системе`
    }
}

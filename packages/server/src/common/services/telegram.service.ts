import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IConfig } from '@/types'

@injectable()
export class TelegramService {
    constructor(
        @inject(TYPES.CONFIG) private config: IConfig,
    ) {

    }

    async sendCustomerData() {
        try {
            const response = await fetch(`${this.config.telegramBotUrl}/api/v1/candidate`)

            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
}

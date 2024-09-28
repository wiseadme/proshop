import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IConfig } from '@/types'

export interface ICandidate {
    phone: string
}

export interface ITelegramService {
    sendCandidate(candidate: ICandidate): Promise<boolean>

    checkCode(code: string): Promise<boolean>
}

@injectable()
export class TelegramService implements ITelegramService {
    constructor(
        @inject(TYPES.CONFIG) private config: IConfig,
    ) {
    }

    async sendCandidate(candidate: Record<string, any>): Promise<boolean> {
        try {
            const response = await fetch(`${this.config.telegramBotUrl}/api/v1/candidate`, {
                method: 'POST',
                body: JSON.stringify(candidate),
            })

            console.log(response)

            return true
        } catch (err) {
            return false
        }
    }

    async checkCode(code: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.config.telegramBotUrl}/api/v1/check`, {
                method: 'POST',
                body: JSON.stringify({ code })
            })

            console.log(response)

            return true
        } catch (err) {
            return false
        }
    }
}

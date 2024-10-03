import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IConfig } from '@/types'

export interface IBotService {
    sendMessage(payload: { userId: number, message: string }): Promise<boolean>
}

@injectable()
export class BotService implements IBotService {
    constructor(
        @inject(TYPES.CONFIG) private config: IConfig,
    ) {
    }

    async sendMessage(payload: Record<string, any>): Promise<boolean> {
        try {
            await fetch(`${this.config.telegramBotUrl}/api/v1/message`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })

            return true
        } catch (err) {
            return false
        }
    }
}

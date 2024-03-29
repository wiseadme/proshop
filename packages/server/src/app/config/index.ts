import dotenv from 'dotenv'
import path from 'path'
import { IConfig } from '@/types'
import * as process from 'process'

const root = path.join.bind(this, __dirname)

dotenv.config({
    path: root('../../../.env'),
})

export class Config implements IConfig {
    port = Number(process.env.PORT!)
    dbUri = process.env.MONGO_URI!
    accessSecret = process.env.ACCESS_TOKEN_SECRET_KEY!
    refreshSecret = process.env.REFRESH_TOKEN_SECRET_KEY!
    uploadsDir = process.env.UPLOADS_DIR!
    redisUrl = process.env.REDIS_URL
    websiteUrl = process.env.WEBSITE_URL!
}

export const config = new Config()

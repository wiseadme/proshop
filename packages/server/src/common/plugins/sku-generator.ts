import crypto from 'crypto'
import { injectable } from 'inversify'

export class SkuGenerator {
    generateRandomString = (length) => {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length)
    }

    generateSku = ({ url, id }) => {
        const urlPrefix = url.substring(0, 5).toUpperCase()
        const idPrefix = id.substring(id.length - 5, id.length - 1).toUpperCase()

        const randomPart = this.generateRandomString(4).toUpperCase()

        return `${urlPrefix}${idPrefix}${randomPart}`
    }

    static generate({ url, id }) {
        return new SkuGenerator().generateSku({ url, id })
    }
}

export const skuGenerator = new SkuGenerator()

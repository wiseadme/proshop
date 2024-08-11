import { model, Schema } from 'mongoose'
import { IMerchantMongoModel } from '@proshop-app/types'

const MerchantSchema: Schema = new Schema<IMerchantMongoModel>({
    _id: Schema.Types.ObjectId,
    organization: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: null,
        required: true
    },
    currency: {
        type: {
            name: String,
            symbol: String,
            description: String,
            country: String,
            countryId: String,
            code: String,
            abbr: String
        },
        required: true,
        _id: false
    },
    description: {
        type: String,
        default: null,
    },
    logo: {
        type: String,
        default: null,
    },
    slogan: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    stores: {
        type: Array,
        default: null,
    },
    social: {
        type: {
            vk: String,
            facebook: String,
            instagram: String,
        },
        default: null,
        _id: false
    },
}, {
    timestamps: true,
})

export const MerchantModel = model<IMerchantMongoModel>('Merchant', MerchantSchema)

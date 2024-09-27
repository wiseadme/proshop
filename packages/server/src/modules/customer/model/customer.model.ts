import { model, Schema } from 'mongoose'
import { ICustomerMongoModel } from '@proshop-app/types'

const CustomerSchema: Schema = new Schema<ICustomerMongoModel>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
})

export const CustomerModel = model<ICustomerMongoModel>('Customer', CustomerSchema)

import { Document, model, Schema } from 'mongoose'
import { ICustomer } from '@proshop/types'

const CustomerSchema: Schema = new Schema<ICustomer & Document>({
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
}, {
    timestamps: true,
})

export const CustomerModel = model<ICustomer>('Customer', CustomerSchema)

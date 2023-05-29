import { Document, model, Schema } from 'mongoose'
import { IUser } from '@proshop/types'

const UserSchema = new Schema<Document & IUser>({
    _id: Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: null,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    roles: {
        type: Array as any,
        required: true,
    },
    position: {
        type: Object,
        default: null,
    },
    accessToken: {
        type: String,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export const UserModel = model('User', UserSchema)

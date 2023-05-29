import { Document, model, Schema } from 'mongoose'
import { IUnit } from '@proshop/types'

const UnitSchema = new Schema<Document & IUnit>({
    _id: Schema.Types.ObjectId,
    value: {
        type: String,
        required: true,
    },
    meta: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
})

export const UnitModel = model<IUnit>('Unit', UnitSchema)

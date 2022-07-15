import { model, Schema, Document } from 'mongoose'
import { IVariant } from '../types/model'

const VariantSchema = new Schema<Document & IVariant>({
  _id: Schema.Types.ObjectId,
  group: {
    type: String,
    required: true
  },
  options: {
    type: Array as any,
    required: true
  }
}, {
  timestamps: true
})

export const VariantModel = model<IVariant>('Variant', VariantSchema)

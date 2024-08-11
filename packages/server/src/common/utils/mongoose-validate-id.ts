import mongoose from 'mongoose'

export const validateId = (id: string) => {
    if (!mongoose.isValidObjectId(id)) {
        throw ({ status: 403, message: 'model id is not valid' })
    }
}

import mongoose, { Document } from 'mongoose'
import { injectable } from 'inversify'
import { CustomerModel } from '@modules/customer/model/customer.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer } from '@ecommerce-platform/types'

@injectable()
export class CustomerRepository implements ICustomerRepository {
  async create(params): Promise<ICustomer & Document> {

    const customer = new CustomerModel({
      _id: new mongoose.Types.ObjectId(),
      name: params.name,
      phone: params.phone,
    })

    await customer.save()

    return customer
  }

  async read(params) {
    return CustomerModel.find(params)
  }

  async update(updates: Partial<ICustomer>) {
    validateId(updates._id)

    const updated = await CustomerModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as ICustomer & Document

    return { updated }
  }

  async delete(id) {
    validateId(id)

    await CustomerModel.findByIdAndDelete(id)

    return true
  }
}

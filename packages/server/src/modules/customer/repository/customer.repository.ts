import mongoose, { Document } from 'mongoose'
import { injectable } from 'inversify'
import { CustomerModel } from '@modules/customer/model/customer.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer, ICustomerMongoModel } from '@proshop/types'
import { CustomerMapper } from '@modules/customer/mappers/customer.mapper'

@injectable()
export class CustomerRepository implements ICustomerRepository {
    async create(customer: ICustomer): Promise<ICustomer> {

        const customerData = await new CustomerModel({
            ...CustomerMapper.toMongoModelData(customer),
            _id: new mongoose.Types.ObjectId(),
        })
            .save() as ICustomerMongoModel

        return CustomerMapper.toDomain(customerData)
    }

    async read(params: Partial<ICustomer>) {
        const customers = await CustomerModel
            .find(params)
            .lean() as ICustomerMongoModel[]

        return customers.map(customer => CustomerMapper.toDomain(customer))
    }

    async update(updates: Partial<ICustomer>) {
        validateId(updates.id)

        const updated = await CustomerModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        ) as ICustomerMongoModel

        return { updated: CustomerMapper.toDomain(updated) }
    }

    async delete(id) {
        validateId(id)

        await CustomerModel.findByIdAndDelete(id)

        return true
    }
}

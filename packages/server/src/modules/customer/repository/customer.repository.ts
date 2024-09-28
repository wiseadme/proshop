import mongoose from 'mongoose'
import { id, injectable } from 'inversify'
import { CustomerModel } from '@modules/customer/model/customer.model'
import { validateId } from '@common/utils/mongoose-validate-id'
import { ICustomerRepository } from '@modules/customer/types/repository'
import { ICustomer, ICustomerMongoModel } from '@proshop-app/types'
import { CustomerMapper } from '@modules/customer/mappers/customer.mapper'

@injectable()
export class CustomerRepository implements ICustomerRepository {
    async create(customer: ICustomer): Promise<ICustomer> {

        const customerData = (await new CustomerModel({
            ...CustomerMapper.toMongoModelData(customer),
            _id: new mongoose.Types.ObjectId(),
        })
            .save())
            .toObject()

        return CustomerMapper.toDomain(customerData)
    }

    async find(params: Partial<Record<keyof ICustomer, string>>) {
        const customers = await CustomerModel
            .find(params)
            .lean() as ICustomerMongoModel[]

        return customers.map(customer => CustomerMapper.toDomain(customer))
    }

    async update(updates: Partial<ICustomer>) {
        validateId(updates.id!)

        const updated = await CustomerModel.findByIdAndUpdate(
            { _id: updates.id },
            { $set: updates },
            { new: true },
        )
            .lean() as ICustomerMongoModel

        return CustomerMapper.toDomain(updated)
    }

    async delete(id: string) {
        validateId(id)

        await CustomerModel.findByIdAndDelete(id)

        return true
    }
}

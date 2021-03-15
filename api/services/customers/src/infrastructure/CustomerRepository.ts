import ICustomerRespository from '../domain/ICustomerRespository'
import ICustomerCreateDTO from '../domain/dtos/ICustomerCreateDTO'
import Customer from '../domain/Customer'

import CustomerModel from './CustomerModel'

class CustomerRepositoryMongo implements ICustomerRespository {
  private customerModel: typeof CustomerModel

  constructor({ customerModel }: { customerModel: typeof CustomerModel }) {
    this.customerModel = customerModel
  }

  async create(data: ICustomerCreateDTO): Promise<Customer> {
    const customer = new Customer(data)
    const newCustomer = await this.customerModel.create({
      name: customer.name,
      document: customer.document,
      email: customer.email,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    })
    return new Customer(newCustomer)
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find()
    return customers.map(c => new Customer(c))
  }
}

export default CustomerRepositoryMongo

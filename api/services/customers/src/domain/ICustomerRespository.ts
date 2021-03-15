import ICustomerCreateDTO from './dtos/ICustomerCreateDTO'
import Customer from './Customer'

interface ICustomerRepository {
  create(data: ICustomerCreateDTO): Promise<Customer>
  findAll(): Promise<Customer[]>
}

export default ICustomerRepository
